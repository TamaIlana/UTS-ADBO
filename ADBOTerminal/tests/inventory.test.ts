import {
  Builder,
  InstrumentType,
  Wood,
  GuitarSpec,
  MandolinSpec,
  Inventory,
} from "../src/index";

describe("Rick's Guitar Shop Inventory", () => {
  let inventory: Inventory;

  beforeEach(() => {
    inventory = new Inventory();

    inventory.addInstrument(
      "G-001",
      1500,
      new GuitarSpec(
        Builder.FENDER,
        "Stratocaster",
        InstrumentType.ELECTRIC,
        6,
        Wood.ALDER,
        Wood.ALDER
      )
    );

    inventory.addInstrument(
      "M-001",
      2500,
      new MandolinSpec(
        Builder.GIBSON,
        "F-5",
        InstrumentType.ACOUSTIC,
        "F",
        Wood.MAPLE,
        Wood.SPRUCE
      )
    );
  });

  test("find matching guitar", () => {
    const searchSpec = new GuitarSpec(
      Builder.FENDER,
      "Stratocaster",
      InstrumentType.ELECTRIC,
      6
    );

    const result = inventory.search(searchSpec);
    expect(result.length).toBe(1);
    expect(result[0].serialNumber).toBe("G-001");
  });

  test("no match returns empty", () => {
    const searchSpec = new GuitarSpec(
      Builder.GIBSON,
      "Les Paul",
      InstrumentType.ELECTRIC,
      6
    );

    const result = inventory.search(searchSpec);
    expect(result.length).toBe(0);
  });

  test("partial search works", () => {
    const searchSpec = new GuitarSpec(Builder.FENDER);
    const result = inventory.search(searchSpec);
    expect(result.length).toBe(1);
  });

  test("mandolin style match", () => {
    const searchSpec = new MandolinSpec(
      Builder.GIBSON,
      undefined,
      undefined,
      "F"
    );

    const result = inventory.search(searchSpec);
    expect(result.length).toBe(1);
    expect(result[0].serialNumber).toBe("M-001");
  });
});
