const express = require("express");
const app = express();
const path = require("path");

// 1. DATA DATABASE (Sesuaikan harga & model di sini)
const inventory = [
  {
    price: 2499,
    spec: {
      builder: "Gibson",
      model: "Les Paul Standard",
      topWood: "Maple",
      backWood: "Mahogany",
    },
  },
  {
    price: 1899,
    spec: {
      builder: "Fender",
      model: "Stratocaster",
      topWood: "Alder",
      backWood: "Maple",
    },
  },
];

// 2. AGAR GAMBAR & HTML BISA DIAKSES
app.use(express.static(__dirname));
app.use("/images", express.static(path.join(__dirname, "images")));

// 3. JALUR API (Untuk mengirim data harga ke HTML)
app.get("/api/inventory", (req, res) => {
  res.json(inventory);
});

// 4. JALANKAN SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
