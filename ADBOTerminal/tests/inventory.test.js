"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe("Rick's Guitar Shop Inventory", () => {
    let inventory;
    beforeEach(() => {
        inventory = new index_1.Inventory();
        inventory.addInstrument("G-001", 1500, new index_1.GuitarSpec(index_1.Builder.FENDER, "Stratocaster", index_1.InstrumentType.ELECTRIC, 6, index_1.Wood.ALDER, index_1.Wood.ALDER));
        inventory.addInstrument("M-001", 2500, new index_1.MandolinSpec(index_1.Builder.GIBSON, "F-5", index_1.InstrumentType.ACOUSTIC, "F", index_1.Wood.MAPLE, index_1.Wood.SPRUCE));
    });
    test("find matching guitar", () => {
        const searchSpec = new index_1.GuitarSpec(index_1.Builder.FENDER, "Stratocaster", index_1.InstrumentType.ELECTRIC, 6);
        const result = inventory.search(searchSpec);
        expect(result.length).toBe(1);
        expect(result[0].serialNumber).toBe("G-001");
    });
    test("no match returns empty", () => {
        const searchSpec = new index_1.GuitarSpec(index_1.Builder.GIBSON, "Les Paul", index_1.InstrumentType.ELECTRIC, 6);
        const result = inventory.search(searchSpec);
        expect(result.length).toBe(0);
    });
    test("partial search works", () => {
        const searchSpec = new index_1.GuitarSpec(index_1.Builder.FENDER);
        const result = inventory.search(searchSpec);
        expect(result.length).toBe(1);
    });
    test("mandolin style match", () => {
        const searchSpec = new index_1.MandolinSpec(index_1.Builder.GIBSON, undefined, undefined, "F");
        const result = inventory.search(searchSpec);
        expect(result.length).toBe(1);
        expect(result[0].serialNumber).toBe("M-001");
    });
});
