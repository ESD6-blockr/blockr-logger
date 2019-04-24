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

export const logger = Winston.createLogger({
    format: alignedWithColorsAndTime,
    transports: [
        new Winston.transports.Console({}),
        new Winston.transports.File({
            filename: `${PATH}/info.log`,
            level: "info",
        }),
        new Winston.transports.File({
            filename: `${PATH}/error.log`,
            level: "error",
        }),
    ],
});
