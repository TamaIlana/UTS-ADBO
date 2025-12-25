import * as readline from "readline";
import * as fs from "fs";
import {
  Builder,
  InstrumentType,
  Wood,
  GuitarSpec,
  MandolinSpec,
  Inventory,
  InstrumentSpec,
  Instrument,
} from "./inventory";

const DATA_FILE = "./inventory.json";
const inventory = new Inventory();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper untuk Input Async
const ask = (q: string): Promise<string> =>
  new Promise((res) => rl.question(q, res));

// --- 💾 SISTEM PENYIMPANAN DATA (PERSISTENCE) ---

function saveData() {
  // Mengambil data dari array privat menggunakan casting
  const allItems = (inventory as any).instruments;
  fs.writeFileSync(DATA_FILE, JSON.stringify(allItems, null, 2));
}

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const items = JSON.parse(raw);
      (inventory as any).instruments = []; // Reset memori
      items.forEach((item: any) => {
        let spec: InstrumentSpec;
        if (item.spec.numStrings !== undefined) {
          spec = new GuitarSpec(
            item.spec.builder,
            item.spec.model,
            item.spec.type,
            item.spec.numStrings,
            item.spec.backWood,
            item.spec.topWood
          );
        } else {
          spec = new MandolinSpec(
            item.spec.builder,
            item.spec.model,
            item.spec.type,
            item.spec.style,
            item.spec.backWood,
            item.spec.topWood
          );
        }
        inventory.addInstrument(item.serialNumber, item.price, spec);
      });
    } catch (e) {
      console.log("Sistem: Memulai dengan inventaris kosong.");
    }
  }
}

// --- 🛠️ FUNGSI PEMBANTU (USER FRIENDLY) ---

async function pilihMenuEnum(enumObj: any, label: string): Promise<any> {
  const values = Object.values(enumObj);
  console.log(`\n--- Daftar ${label} ---`);
  values.forEach((v, i) => console.log(`[${i + 1}] ${v}`));
  console.log(`[0] Lewati (Apa Saja)`);

  const choice = await ask(`Pilih ${label} (0-${values.length}): `);
  const idx = parseInt(choice) - 1;
  return values[idx] || undefined;
}

// --- 🛒 MODE PEMBELI (SEARCH) ---

async function buyerMode() {
  console.log("\n" + "=".repeat(40));
  console.log("       MENU PENCARIAN PEMBELI");
  console.log("=".repeat(40));

  console.log("Ingin mencari apa?\n1. Gitar\n2. Mandolin");
  const jenis = await ask("Pilihan: ");

  const builder = await pilihMenuEnum(Builder, "Merek/Builder");
  const backWood = await pilihMenuEnum(Wood, "Kayu Belakang");
  const topWood = await pilihMenuEnum(Wood, "Kayu Depan");
  const modelKeyword = await ask(
    "\nKata kunci model (misal: 'Strat' - kosongkan untuk semua): "
  );
  const maxPrice = await ask("Budget Maksimal ($): ");

  let spec: InstrumentSpec =
    jenis === "1"
      ? new GuitarSpec(builder, undefined, undefined, 6, backWood, topWood)
      : new MandolinSpec(builder, undefined, undefined, "F", backWood, topWood);

  let results = inventory.search(spec);

  // Filter tambahan: Keyword & Harga
  if (modelKeyword) {
    results = results.filter((i) =>
      i.spec.model?.toLowerCase().includes(modelKeyword.toLowerCase())
    );
  }
  if (maxPrice) {
    results = results.filter((i) => i.price <= parseFloat(maxPrice));
  }

  console.log("\n" + "*".repeat(40));
  if (results.length === 0) {
    console.log("Maaf, tidak ada instrumen yang cocok.");
  } else {
    console.log(`Ditemukan ${results.length} Pilihan Terbaik:`);
    results.forEach((i) => {
      console.log(`- ${i.spec.builder} ${i.spec.model} ($${i.price})`);
      console.log(
        `  Spesifikasi: ${i.spec.backWood} Back, ${i.spec.topWood} Top`
      );
    });
  }
  console.log("*".repeat(40));
}

// --- 📦 MODE PENJUAL (MANAGEMENT) ---

async function sellerMode() {
  while (true) {
    console.log("\n" + "=".repeat(40));
    console.log("      MENU MANAJEMEN PENJUAL");
    console.log("=".repeat(40));
    console.log("1. Tambah Stok Baru");
    console.log("2. Hapus Stok (Terjual)");
    console.log("3. Lihat Semua Inventaris");
    console.log("4. Kembali ke Menu Utama");

    const choice = await ask("Pilih aksi: ");

    if (choice === "1") {
      const type = await ask("\nJenis (1. Gitar, 2. Mandolin): ");
      const sn = await ask("Serial Number: ");
      const price = await ask("Harga Jual ($): ");
      const model = await ask("Nama Model: ");
      const builder = await pilihMenuEnum(Builder, "Builder");
      const back = await pilihMenuEnum(Wood, "Back Wood");
      const top = await pilihMenuEnum(Wood, "Top Wood");

      let spec =
        type === "1"
          ? new GuitarSpec(
              builder,
              model,
              InstrumentType.ELECTRIC,
              6,
              back,
              top
            )
          : new MandolinSpec(
              builder,
              model,
              InstrumentType.ACOUSTIC,
              "F",
              back,
              top
            );

      inventory.addInstrument(sn, parseFloat(price), spec);
      saveData();
      console.log("\n✅ Berhasil! Data tersimpan secara permanen.");
    } else if (choice === "2") {
      const sn = await ask("Masukkan Serial Number barang yang terjual: ");
      const initialCount = (inventory as any).instruments.length;
      (inventory as any).instruments = (inventory as any).instruments.filter(
        (i: any) => i.serialNumber !== sn
      );

      if ((inventory as any).instruments.length < initialCount) {
        saveData();
        console.log(`\n✅ Berhasil! Barang dengan SN ${sn} telah dihapus.`);
      } else {
        console.log("\n❌ Gagal: Serial Number tidak ditemukan.");
      }
    } else if (choice === "3") {
      const all = (inventory as any).instruments;
      console.log("\n--- DAFTAR SEMUA STOK ---");
      all.forEach((i: any) =>
        console.log(
          `[${i.serialNumber}] ${i.spec.builder} ${i.spec.model} - $${i.price}`
        )
      );
    } else if (choice === "4") break;
  }
}

// --- 🏁 MAIN PROGRAM ---

async function main() {
  loadData();
  while (true) {
    console.log("\n" + "=".repeat(45));
    console.log("   SISTEM INVENTARIS TOKO MUSIK RICK");
    console.log("=".repeat(45));
    console.log("1. Masuk sebagai PEMBELI (Cari Barang)");
    console.log("2. Masuk sebagai PENJUAL (Kelola Stok)");
    console.log("3. Keluar");

    const role = await ask("\nSilakan pilih akses: ");

    if (role === "1") await buyerMode();
    else if (role === "2") await sellerMode();
    else if (role === "3") {
      console.log("Terima kasih! Sampai jumpa.");
      break;
    }

    const back = await ask("\nKembali ke Menu Utama? (y/n): ");
    if (back.toLowerCase() !== "y") break;
  }
  rl.close();
}

main();
