/**
 * ==========================================
 * 1. CLASS: InstrumentSpec (Base Class)
 * ==========================================
 */
class InstrumentSpec {
  constructor(builder, model, type, backWood, topWood) {
    // Attributes
    this.builder = builder;
    this.model = model;
    this.type = type;
    this.backWood = backWood;
    this.topWood = topWood;
  }

  /**
   * Method: Memeriksa apakah spesifikasi saat ini cocok dengan kriteria pencarian
   */
  matches(otherSpec) {
    if (otherSpec.builder && this.builder !== otherSpec.builder) return false;
    if (
      otherSpec.model &&
      this.model.toLowerCase() !== otherSpec.model.toLowerCase()
    )
      return false;
    if (otherSpec.type && this.type !== otherSpec.type) return false;
    if (otherSpec.backWood && this.backWood !== otherSpec.backWood)
      return false;
    if (otherSpec.topWood && this.topWood !== otherSpec.topWood) return false;
    return true;
  }
}

/**
 * ==========================================
 * 2. CLASS: GuitarSpec (Sub-class dari InstrumentSpec)
 * ==========================================
 */
class GuitarSpec extends InstrumentSpec {
  constructor(builder, model, type, numStrings, backWood, topWood) {
    // Memanggil constructor induk
    super(builder, model, type, backWood, topWood);
    // Attribute tambahan khusus Gitar
    this.numStrings = numStrings;
  }

  // Method Override untuk mencocokkan numStrings
  matches(otherSpec) {
    if (!(otherSpec instanceof GuitarSpec)) return false;
    if (!super.matches(otherSpec)) return false;
    if (this.numStrings !== otherSpec.numStrings) return false;
    return true;
  }
}

/**
 * ==========================================
 * 3. CLASS: MandolinSpec (Sub-class dari InstrumentSpec)
 * ==========================================
 */
class MandolinSpec extends InstrumentSpec {
  constructor(builder, model, type, style, backWood, topWood) {
    super(builder, model, type, backWood, topWood);
    // Attribute tambahan khusus Mandolin
    this.style = style;
  }

  // Method Override untuk mencocokkan style
  matches(otherSpec) {
    if (!(otherSpec instanceof MandolinSpec)) return false;
    if (!super.matches(otherSpec)) return false;
    if (this.style !== otherSpec.style) return false;
    return true;
  }
}

/**
 * ==========================================
 * 4. CLASS: Instrument
 * ==========================================
 */
class Instrument {
  constructor(serialNumber, price, spec) {
    // Attributes
    this.serialNumber = serialNumber;
    this.price = price;
    this.spec = spec; // Menggunakan Composition (objek spec di dalam instrument)
  }
}

/**
 * ==========================================
 * 5. CLASS: Inventory
 * ==========================================
 */
class Inventory {
  constructor() {
    // Attribute: Menyimpan daftar instrumen
    this.inventory = [];
  }

  /**
   * Method: Menambahkan instrumen baru ke dalam daftar
   */
  addInstrument(serialNumber, price, spec) {
    const instrument = new Instrument(serialNumber, price, spec);
    this.inventory.push(instrument);
  }

  /**
   * Method: Mencari instrumen berdasarkan spesifikasi yang diberikan
   */
  search(searchSpec) {
    const matchingInstruments = [];
    for (let instrument of this.inventory) {
      if (instrument.spec.matches(searchSpec)) {
        matchingInstruments.push(instrument);
      }
    }
    return matchingInstruments;
  }
}

/**
 * ==========================================
 * CONTOH PENGGUNAAN (MAIN LOGIC)
 * ==========================================
 */

const myInventory = new Inventory();

// 1. Menambahkan data gitar
const fenderSpec = new GuitarSpec(
  "Fender",
  "Stratocaster",
  "Electric",
  6,
  "Alder",
  "Maple"
);
myInventory.addInstrument("V12345", 1499.99, fenderSpec);

// 2. Menambahkan data mandolin
const gibsonMandolinSpec = new MandolinSpec(
  "Gibson",
  "F-5",
  "Acoustic",
  "F-style",
  "Maple",
  "Spruce"
);
myInventory.addInstrument("M98765", 2500.0, gibsonMandolinSpec);

// 3. Simulasi Pencarian
console.log("--- Melakukan Pencarian Gitar Fender Stratocaster ---");
const searchCriteria = new GuitarSpec(
  "Fender",
  "Stratocaster",
  "Electric",
  6,
  "Alder",
  "Maple"
);
const results = myInventory.search(searchCriteria);

if (results.length > 0) {
  results.forEach((item) => {
    console.log(
      `Ditemukan: ${item.spec.builder} ${item.spec.model} dengan harga $${item.price}`
    );
  });
} else {
  console.log("Maaf, barang tidak ditemukan.");
}
