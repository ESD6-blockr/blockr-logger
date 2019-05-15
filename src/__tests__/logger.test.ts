import { logger} from "../logger";

describe("Logger util", () => {
    it("Should be instantiated when imported", () => {
        expect(logger).toBeDefined();
    });

    it("Should have transportation options defined on import", () => {
        expect(logger.transports.length).toBeGreaterThan(1);
    });

    it("Should match the defined logging format", () => {
        const log = logger.info("text");

        expect(log).toBeDefined();
        expect(log.level).toBe("info");
    });
});
