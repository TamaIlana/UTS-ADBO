/* ================= SPEC (INHERITANCE & POLYMORPHISM) ================= */
class InstrumentSpec {
  constructor(builder, model, type, backWood, topWood) {
    this.builder = builder || null;
    this.model = model || null;
    this.type = type || null;
    this.backWood = backWood || null;
    this.topWood = topWood || null;
  }

  matches(otherSpec) {
    const flexibleMatch = (stored, search) => {
      if (!search) return true;
      if (!stored) return false;
      return stored.toLowerCase().includes(search.toLowerCase());
    };

    if (!flexibleMatch(this.builder, otherSpec.builder)) return false;
    if (otherSpec.model && !flexibleMatch(this.model, otherSpec.model))
      return false;
    if (!flexibleMatch(this.type, otherSpec.type)) return false;
    if (!flexibleMatch(this.backWood, otherSpec.backWood)) return false;
    if (!flexibleMatch(this.topWood, otherSpec.topWood)) return false;
    return true;
  }
}

class GuitarSpec extends InstrumentSpec {
  constructor(builder, model, type, numStrings, backWood, topWood) {
    super(builder, model, type, backWood, topWood);
    this.numStrings = numStrings || null;
  }
  matches(otherSpec) {
    if (!(otherSpec instanceof GuitarSpec)) return false;
    if (otherSpec.numStrings && this.numStrings !== otherSpec.numStrings)
      return false;
    return super.matches(otherSpec);
  }
}

class MandolinSpec extends InstrumentSpec {
  constructor(builder, model, type, style, backWood, topWood) {
    super(builder, model, type, backWood, topWood);
    this.style = style || null;
  }
  matches(otherSpec) {
    if (!(otherSpec instanceof MandolinSpec)) return false;
    if (
      otherSpec.style &&
      !this.style?.toLowerCase().includes(otherSpec.style.toLowerCase())
    )
      return false;
    return super.matches(otherSpec);
  }
}

/* ================= INSTRUMENT (ENCAPSULATION) ================= */
class Instrument {
  #serialNumber;
  #price;
  #stock;
  #spec;
  constructor(sn, price, spec, stock = 0) {
    this.#serialNumber = sn;
    this.#price = price;
    this.#spec = spec;
    this.#stock = stock;
  }
  get serialNumber() {
    return this.#serialNumber;
  }
  get price() {
    return this.#price;
  }
  get spec() {
    return this.#spec;
  }
  get stock() {
    return this.#stock;
  }

  reduceStock(amount) {
    if (this.#stock >= amount) {
      this.#stock -= amount;
      return true;
    }
    return false;
  }

  getStockStatus() {
    if (this.#stock <= 0) return "❌ Stok Habis";
    if (this.#stock <= 2) return `⚠️ Stok Terbatas (${this.#stock})`;
    return `✅ Stok Tersedia (${this.#stock})`;
  }
}

/* ================= INVENTORY (ABSTRACTION) ================= */
class Inventory {
  #instruments = [];
  addInstrument(sn, price, spec, stock) {
    this.#instruments.push(new Instrument(sn, price, spec, stock));
  }
  getInstrument(sn) {
    return this.#instruments.find(
      (i) => i.serialNumber.toLowerCase() === sn.toLowerCase()
    );
  }
  search(searchSpec, minPrice, maxPrice) {
    return this.#instruments.filter((item) => {
      const priceMatch =
        (!minPrice || item.price >= minPrice) &&
        (!maxPrice || item.price <= maxPrice);
      return priceMatch && item.spec.matches(searchSpec);
    });
  }
  getAll() {
    return this.#instruments;
  }
}

/* ================= UI & APP LOGIC ================= */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const inventory = new Inventory();
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

function seed() {
  // --- GIBSON ACOUSTIC (6-STRINGS) ---
  inventory.addInstrument(
    "G16",
    2800,
    new GuitarSpec(
      "Gibson",
      "J-45 Standard",
      "Acoustic",
      6,
      "Mahogany",
      "Spruce"
    ),
    3
  );
  inventory.addInstrument(
    "G17",
    5200,
    new GuitarSpec(
      "Gibson",
      "Hummingbird",
      "Acoustic",
      6,
      "Mahogany",
      "Spruce"
    ),
    2
  );
  inventory.addInstrument(
    "G18",
    4500,
    new GuitarSpec(
      "Gibson",
      "SJ-200 Super Jumbo",
      "Acoustic",
      6,
      "Maple",
      "Spruce"
    ),
    1
  );

  // --- ELECTRIC GUITARS ---
  inventory.addInstrument(
    "G01",
    1499,
    new GuitarSpec(
      "Fender",
      "Stratocaster Pro",
      "Electric",
      6,
      "Alder",
      "Maple"
    ),
    5
  );
  inventory.addInstrument(
    "G02",
    2450,
    new GuitarSpec(
      "Gibson",
      "Les Paul Standard",
      "Electric",
      6,
      "Mahogany",
      "Maple"
    ),
    2
  );
  inventory.addInstrument(
    "G04",
    1350,
    new GuitarSpec(
      "Ibanez",
      "RG550 Genesis",
      "Electric",
      6,
      "Basswood",
      "Maple"
    ),
    10
  );
  inventory.addInstrument(
    "G06",
    1850,
    new GuitarSpec(
      "Gibson",
      "SG Standard",
      "Electric",
      6,
      "Mahogany",
      "Mahogany"
    ),
    3
  );
  inventory.addInstrument(
    "G09",
    1999,
    new GuitarSpec(
      "Ibanez",
      "RG7 Prestige",
      "Electric",
      7,
      "Mahogany",
      "Maple"
    ),
    2
  );

  // --- CLASSICAL & BASS ---
  inventory.addInstrument(
    "G20",
    1200,
    new GuitarSpec("Fender", "CN-140SCE", "Classical", 6, "Rosewood", "Cedar"),
    4
  );
  inventory.addInstrument(
    "G05",
    999,
    new GuitarSpec("Fender", "Precision Bass", "Electric", 4, "Alder", "Maple"),
    6
  );

  // --- MANDOLINS ---
  inventory.addInstrument(
    "M01",
    5200,
    new MandolinSpec(
      "Gibson",
      "F-5 Master",
      "Acoustic",
      "F",
      "Maple",
      "Spruce"
    ),
    1
  );
  inventory.addInstrument(
    "M04",
    1150,
    new MandolinSpec(
      "Martin",
      "Style A Vintage",
      "Acoustic",
      "A",
      "Mahogany",
      "Spruce"
    ),
    2
  );
}

async function chooseWood(label) {
  console.log(`\nPilih ${label}:`);
  console.log(
    "1. Mahogany\n2. Maple\n3. Alder\n4. Rosewood\n5. Spruce\n6. All (Semua Kayu)"
  );
  const woodMap = {
    1: "Mahogany",
    2: "Maple",
    3: "Alder",
    4: "Rosewood",
    5: "Spruce",
  };
  const choice = await ask("Pilihan: ");
  return woodMap[choice] || null;
}

async function searchAndBuyUI() {
  console.log("\n--- MODE PENCARIAN INSTRUMEN ---");
  console.log("Pilih Kategori:\n1. Gitar\n2. Mandolin\n3. All (Semua)");
  const catChoice = await ask("Pilihan: ");

  console.log(
    "\nPilih Builder:\n1. Fender\n2. Gibson\n3. Martin\n4. Ibanez\n5. All (Semua)"
  );
  const bMap = { 1: "Fender", 2: "Gibson", 3: "Martin", 4: "Ibanez" };
  const b = bMap[await ask("Pilihan: ")] || null;

  console.log(
    "\nPilih Tipe:\n1. Electric\n2. Acoustic\n3. Classical\n4. All (Semua)"
  );
  const tMap = { 1: "Electric", 2: "Acoustic", 3: "Classical" };
  const t = tMap[await ask("Pilihan: ")] || null;

  const bw = await chooseWood("Back Wood");
  const tw = await chooseWood("Top Wood");

  let spec;
  if (catChoice === "1") {
    console.log("\nJumlah Senar:\n1. 6\n2. 7\n3. 4 (Bass)\n4. All (Semua)");
    const sMap = { 1: 6, 2: 7, 3: 4 };
    const s = sMap[await ask("Pilihan: ")] || null;
    spec = new GuitarSpec(b, null, t, s, bw, tw);
  } else if (catChoice === "2") {
    console.log("\nStyle Mandolin:\n1. A\n2. F\n3. All (Semua)");
    const stMap = { 1: "A", 2: "F" };
    const st = stMap[await ask("Pilihan: ")] || null;
    spec = new MandolinSpec(b, null, t, st, bw, tw);
  } else {
    spec = new InstrumentSpec(b, null, t, bw, tw);
  }

  const results = inventory.search(spec, null, null);
  displayItems(results);

  if (results.length > 0) {
    let buying = true;
    while (buying) {
      const snInput = await ask(
        "\nMasukkan Serial Number [ ] untuk beli (atau 'n' untuk batal): "
      );
      if (snInput.toLowerCase() === "n") {
        buying = false;
      } else {
        const item = inventory.getInstrument(snInput);
        if (item && item.reduceStock(1)) {
          console.log(
            `\n✅ BERHASIL! Membeli ${item.spec.builder} ${item.spec.model}.`
          );
          buying = false;
        } else {
          console.log(`\n❌ GAGAL: Kode salah atau stok habis.`);
        }
      }
    }
  }
  customerMenu();
}

function displayItems(items = inventory.getAll()) {
  console.log("\n--- HASIL DAFTAR INSTRUMEN ---");
  if (items.length === 0) return console.log("Data tidak ditemukan.");
  items.forEach((i) => {
    const detail =
      i.spec instanceof GuitarSpec
        ? `${i.spec.numStrings} Senar`
        : `Style ${i.spec.style}`;
    console.log(
      `[${i.serialNumber}] ${i.spec.builder} ${i.spec.model} | $${
        i.price
      } | ${i.getStockStatus()}`
    );
    console.log(
      `    Detail: ${i.spec.type}, Kayu: ${i.spec.backWood || "All"}/${
        i.spec.topWood || "All"
      }, ${detail}`
    );
    console.log("--------------------------------------------------");
  });
}

async function customerMenu() {
  console.log(
    "\n--- MENU PELANGGAN ---\n1. Cari & Beli\n2. Katalog Lengkap\n3. Kembali"
  );
  const choice = await ask("Pilih: ");
  if (choice === "1") await searchAndBuyUI();
  else if (choice === "2") {
    displayItems();
    customerMenu();
  } else loginMenu();
}

async function loginMenu() {
  console.log("\n=== RICK'S MUSIC STORE ===");
  console.log("1. Menu Pelanggan\n2. Keluar");
  const choice = await ask("Pilih menu: ");
  if (choice === "1") customerMenu();
  else process.exit();
}

seed();
loginMenu();
