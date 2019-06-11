import * as fs from "fs";
import * as Winston from "winston";

const PATH = "logs/";
const TIME_STAMP_INDENT: number = 19;
const JSON_SPACING: number = 2;

const alignedWithColorsAndTime = Winston.format.combine(
    Winston.format.colorize(),
    Winston.format.timestamp(),
    Winston.format.align(),
    Winston.format.printf((info) => {
        const {
            timestamp,
            level,
            message,
            ...args
        } = info;

        const ts = timestamp.slice(0, TIME_STAMP_INDENT).replace("T", " ");
        return `${ts} [${level}]: ${message} ${Object.keys(args).length ?
            JSON.stringify(args, null, JSON_SPACING) : ""}`;
    }),
);

const hasPathAccess = async (path: any): Promise<boolean> => {
    return new Promise((resolve) => {
        fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            resolve(err == null);
        });
    });
};

const getTransports = async (): Promise<any[]> => {
    return await hasPathAccess("./") ? [
        new Winston.transports.Console({}),
        new Winston.transports.File({
            filename: `${PATH}/full.log`,
        }),
        new Winston.transports.File({
            filename: `${PATH}/error.log`,
            level: "error",
        }),
    ] : [
        new Winston.transports.Console({}),
    ];
};

export let logger = Winston.createLogger({
    format: alignedWithColorsAndTime,
    transports: [
        new Winston.transports.Console({}),
    ],
});

(async () => {
    logger = Winston.createLogger({
        format: alignedWithColorsAndTime,
        transports: await getTransports(),
    });
})();
