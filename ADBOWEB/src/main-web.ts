import express from "express";
import * as fs from "fs";
import path from "path";
import { Inventory, GuitarSpec, MandolinSpec } from "./inventory";

const app = express();
const port = 3000;
const inventory = new Inventory();

// --- PENENTUAN PATH YANG LEBIH AKURAT ---
const ROOT_DIR = process.cwd();
const DATA_FILE = path.resolve(ROOT_DIR, "inventory.json");
const PUBLIC_DIR = path.resolve(ROOT_DIR, "public");

// Mencoba mencari folder images di root project secara absolut
let IMAGES_DIR = path.resolve(ROOT_DIR, "images");

// Jika tidak ketemu di root, coba cari relatif terhadap file ini (untuk struktur src/dist)
if (!fs.existsSync(IMAGES_DIR)) {
  IMAGES_DIR = path.join(__dirname, "../images");
}

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const items = JSON.parse(raw);
      (inventory as any).instruments = [];
      items.forEach((item: any) => {
        let spec =
          item.spec.numStrings !== undefined
            ? new GuitarSpec(
                item.spec.builder,
                item.spec.model,
                item.spec.type,
                item.spec.numStrings,
                item.spec.backWood,
                item.spec.topWood
              )
            : new MandolinSpec(
                item.spec.builder,
                item.spec.model,
                item.spec.type,
                item.spec.style,
                item.spec.backWood,
                item.spec.topWood
              );
        inventory.addInstrument(item.serialNumber, item.price, spec);
      });
    } catch (e) {
      console.error("❌ Gagal sinkronisasi database JSON.");
    }
  } else {
    console.error("❌ File inventory.json tidak ditemukan di: " + DATA_FILE);
  }
}

// --- LOG DEBUGGING SAAT STARTUP ---
console.log("==========================================");
console.log("🚀 INFO SERVER RICK'S MUSIC");
console.log("Folder Project  :", ROOT_DIR);
console.log("Path Gambar     :", IMAGES_DIR);

try {
  if (fs.existsSync(IMAGES_DIR)) {
    const files = fs.readdirSync(IMAGES_DIR);
    console.log(
      "Isi Folder Img  :",
      files.length > 0 ? files.join(", ") : "Kosong!"
    );
  } else {
    console.error("⚠️ PERINGATAN: Folder 'images' fisik tidak ditemukan!");
  }
} catch (err) {
  console.error("❌ Error saat membaca folder gambar.");
}
console.log("==========================================\n");

// --- MIDDLEWARE ---
// 1. Ekspos folder images
app.use("/images", express.static(IMAGES_DIR));

// 2. Ekspos folder public
app.use(express.static(PUBLIC_DIR));

// --- API ---
app.get("/api/inventory", (req, res) => {
  loadData();
  const allInstruments = (inventory as any).instruments;
  res.json(allInstruments);
});

app.listen(port, () => {
  console.log(`✅ SERVER AKTIF!`);
  console.log(`🔗 Akses Katalog: http://localhost:${port}`);
  console.log(
    `🖼️  Cek Gambar  : http://localhost:${port}/images/stratocaster.png`
  );
});
