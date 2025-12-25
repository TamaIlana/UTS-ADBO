// ================= ENUM =================
export enum Builder {
  FENDER = "Fender",
  GIBSON = "Gibson",
}

export enum InstrumentType {
  ELECTRIC = "Electric",
  ACOUSTIC = "Acoustic",
}

export enum Wood {
  ALDER = "Alder",
  MAPLE = "Maple",
  SPRUCE = "Spruce",
}

// ================= ABSTRACT SPEC =================
export abstract class InstrumentSpec {
  constructor(
    public readonly builder?: Builder,
    public readonly model?: string,
    public readonly type?: InstrumentType,
    public readonly backWood?: Wood,
    public readonly topWood?: Wood
  ) {}

  // ⚠️ PENTING: other = search criteria
  matches(other: InstrumentSpec): boolean {
    if (other.builder && this.builder !== other.builder) return false;

    if (other.model && this.model?.toLowerCase() !== other.model.toLowerCase())
      return false;

    if (other.type && this.type !== other.type) return false;
    if (other.backWood && this.backWood !== other.backWood) return false;
    if (other.topWood && this.topWood !== other.topWood) return false;

    return true;
  }
}

// ================= GUITAR SPEC =================
export class GuitarSpec extends InstrumentSpec {
  constructor(
    builder?: Builder,
    model?: string,
    type?: InstrumentType,
    public readonly numStrings?: number,
    backWood?: Wood,
    topWood?: Wood
  ) {
    super(builder, model, type, backWood, topWood);
  }

  override matches(other: InstrumentSpec): boolean {
    if (!(other instanceof GuitarSpec)) return false;
    if (!super.matches(other)) return false;
    if (other.numStrings && this.numStrings !== other.numStrings) return false;
    return true;
  }
}

// ================= MANDOLIN SPEC =================
export class MandolinSpec extends InstrumentSpec {
  constructor(
    builder?: Builder,
    model?: string,
    type?: InstrumentType,
    public readonly style?: string,
    backWood?: Wood,
    topWood?: Wood
  ) {
    super(builder, model, type, backWood, topWood);
  }

  override matches(other: InstrumentSpec): boolean {
    if (!(other instanceof MandolinSpec)) return false;
    if (!super.matches(other)) return false;
    if (other.style && this.style !== other.style) return false;
    return true;
  }
}

// ================= INSTRUMENT =================
export class Instrument {
  constructor(
    public readonly serialNumber: string,
    public readonly price: number,
    public readonly spec: InstrumentSpec
  ) {}
}

// ================= INVENTORY =================
export class Inventory {
  private instruments: Instrument[] = [];

  addInstrument(sn: string, price: number, spec: InstrumentSpec): void {
    this.instruments.push(new Instrument(sn, price, spec));
  }

  search(searchSpec: InstrumentSpec): Instrument[] {
    return this.instruments.filter((inst) => inst.spec.matches(searchSpec));
  }
}
