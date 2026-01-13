// 1. Class GuitarSpec (Menyimpan detail spesifikasi)
class GuitarSpec {
  constructor(builder, model, type, backWood, topWood) {
    this.builder = builder;
    this.model = model;
    this.type = type;
    this.backWood = backWood;
    this.topWood = topWood;
  }

  getBuilder() {
    return this.builder;
  }
  getModel() {
    return this.model;
  }
  getType() {
    return this.type;
  }
  getBackWood() {
    return this.backWood;
  }
  getTopWood() {
    return this.topWood;
  }
}

// 2. Class Guitar (Hanya menyimpan data unik unit & referensi ke Spec)
class Guitar {
  constructor(serialNumber, price, spec) {
    this.serialNumber = serialNumber;
    this.price = price;
    this.spec = spec;
  }

  getSerialNumber() {
    return this.serialNumber;
  }
  getPrice() {
    return this.price;
  }
  setPrice(newPrice) {
    this.price = newPrice;
  }
  getSpec() {
    return this.spec;
  }
}

// 3. Class Inventory hanya penambahan dari modofikasi tugas halaman 3 (Untuk mengelola koleksi gitar)
class Inventory {
  constructor() {
    this.guitars = [];
  }

  // Menambah gitar baru ke inventori
  addGuitar(serialNumber, price, builder, model, type, backWood, topWood) {
    const spec = new GuitarSpec(builder, model, type, backWood, topWood);
    const guitar = new Guitar(serialNumber, price, spec);
    this.guitars.push(guitar);
  }

  // Mencari gitar berdasarkan spesifikasi yang diinginkan
  search(searchSpec) {
    const matchingGuitars = [];

    for (let guitar of this.guitars) {
      const guitarSpec = guitar.getSpec();

      // Logika pembandingan: hanya jika semua spek cocok
      if (searchSpec.getBuilder() !== guitarSpec.getBuilder()) continue;
      if (
        searchSpec.getModel().toLowerCase() !==
        guitarSpec.getModel().toLowerCase()
      )
        continue;
      if (searchSpec.getType() !== guitarSpec.getType()) continue;
      if (searchSpec.getBackWood() !== guitarSpec.getBackWood()) continue;
      if (searchSpec.getTopWood() !== guitarSpec.getTopWood()) continue;

      matchingGuitars.push(guitar);
    }
    return matchingGuitars;
  }
}

// --- PENGGUNAAN ---

const inventory = new Inventory();

// Isi data ke inventori
inventory.addGuitar(
  "V12345",
  1500.0,
  "Fender",
  "Stratocaster",
  "Electric",
  "Alder",
  "Alder"
);
inventory.addGuitar(
  "M67890",
  2100.0,
  "Martin",
  "D-28",
  "Acoustic",
  "Rosewood",
  "Adirondack"
);

// Skenario: Pelanggan mencari gitar Fender Stratocaster
const clientSpec = new GuitarSpec(
  "Fender",
  "Stratocaster",
  "Electric",
  "Alder",
  "Alder"
);
const results = inventory.search(clientSpec);

if (results.length > 0) {
  console.log("Gitar ditemukan:");
  results.forEach((g) => {
    console.log(`Seri: ${g.getSerialNumber()}, Harga: $${g.getPrice()}`);
  });
} else {
  console.log("Maaf, gitar tidak ditemukan.");
}
