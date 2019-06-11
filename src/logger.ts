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

const hasPathAccess = (path: any): boolean => {
    fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        return !!err;
    });

    return false;
};

const getTransports = (): any[] => {
    if (hasPathAccess(PATH)) {
        return [
            new Winston.transports.Console({}),
        ];
    }

    return [
        new Winston.transports.Console({}),
        new Winston.transports.File({
            filename: `${PATH}/full.log`,
        }),
        new Winston.transports.File({
            filename: `${PATH}/error.log`,
            level: "error",
        }),
    ];
};

export const logger = Winston.createLogger({
    format: alignedWithColorsAndTime,
    transports: getTransports(),
});
