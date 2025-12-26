/* ================= CLASS GUITAR ================= */
class Guitar {
  // Atribut sesuai Class Diagram
  constructor(serialNumber, price, builder, model, type, backWood, topWood) {
    this.serialNumber = serialNumber;
    this.price = price;
    this.builder = builder;
    this.model = model;
    this.type = type;
    this.backWood = backWood;
    this.topWood = topWood;
  }

  // Method Getter sesuai Class Diagram
  getSerialNumber() {
    return this.serialNumber;
  }

  getPrice() {
    return this.price;
  }

  setPrice(newPrice) {
    this.price = newPrice;
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

/* ================= CLASS INVENTORY ================= */
class Inventory {
  constructor() {
    // List untuk menampung objek-objek Guitar
    this.guitars = [];
  }

  // Menambahkan objek Guitar baru ke dalam list
  addGuitar(serialNumber, price, builder, model, type, backWood, topWood) {
    const newGuitar = new Guitar(
      serialNumber,
      price,
      builder,
      model,
      type,
      backWood,
      topWood
    );
    this.guitars.push(newGuitar);
  }

  // Mencari satu objek Guitar berdasarkan serial number
  getGuitar(serialNumber) {
    return this.guitars.find(
      (guitar) => guitar.getSerialNumber() === serialNumber
    );
  }

  // Mencari gitar yang cocok dengan spesifikasi pelanggan
  search(searchGuitar) {
    for (let guitar of this.guitars) {
      // Logika pencarian sederhana (basic)
      if (
        searchGuitar.builder === guitar.builder &&
        searchGuitar.model === guitar.model &&
        searchGuitar.type === guitar.type
      ) {
        return guitar;
      }
    }
    return null;
  }
}

// Contoh Penggunaan:
const myInventory = new Inventory();
myInventory.addGuitar(
  "G123",
  2500,
  "Gibson",
  "J-45",
  "Acoustic",
  "Mahogany",
  "Spruce"
);

console.log(myInventory.getGuitar("G123"));
