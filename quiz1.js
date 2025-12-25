// Class Utama: Karyawan
class Karyawan {
  constructor(nama, gaji) {
    this.nama = nama;
    this.gaji = gaji;
  }
  // Method untuk menghitung bonus (akan di inherit dan di return secara dinamis)
  hitungBonus() {
    return 0;
  }
}

// Class Turunan: Karyawan Tetap (bonus 10% dari gaji)
class KaryawanTetap extends Karyawan {
  hitungBonus() {
    return this.gaji * 0.1;
  }
}

// Class Turunan: Karyawan Kontrak (bonus 5% dari gaji)
class KaryawanKontrak extends Karyawan {
  hitungBonus() {
    return this.gaji * 0.05;
  }
}

// Variabel untuk menyimpan daftar karyawan)
const daftarKaryawanTetap = [
  new KaryawanTetap("Budi", 8000000),
  new KaryawanTetap("Ani", 7500000),
  new KaryawanTetap("Wati", 9000000),
];

const daftarKaryawanKontrak = [
  new KaryawanKontrak("Sita", 6000000),
  new KaryawanKontrak("Rina", 5500000),
  new KaryawanKontrak("Dewi", 5000000),
  new KaryawanKontrak("Tina", 6500000),
];

// Menggabungkan semua karyawan ke dalam satu array
const daftarKaryawan = [...daftarKaryawanTetap, ...daftarKaryawanKontrak];

// Menghitung total bonus seluruh karyawan
let totalBonus = 0;
for (const karyawanBesertaGaji of daftarKaryawan) {
  totalBonus += karyawanBesertaGaji.hitungBonus();
}

// Menampilkan total bonus yang harus dibayarkan
console.log(`Total bonus yang harus dibayarkan: Rp${totalBonus}`);

// Menampilkan total bonus dengan format yang lebih rapi
console.log(`\nTotal Bonus Semua Karyawan: Rp ${totalBonus.toLocaleString()}`);

// Menampilkan daftar karyawan beserta gaji dan bonusnya
console.log(daftarKaryawan);

// Menampilkan data setiap karyawan beserta bonusnya
daftarKaryawan.forEach((karyawan) => {
  console.log(
    `Nama: ${karyawan.nama}, Bonus: Rp ${karyawan
      .hitungBonus()
      .toLocaleString()}`
  );
});

// Menampilkan data setiap karyawan beserta gaji pokoknya
daftarKaryawan.forEach((karyawan) => {
  console.log(
    `Nama: ${karyawan.nama}, Gaji: Rp ${karyawan.gaji.toLocaleString()}`
  );
});

// Menampilkan data setiap karyawan beserta gaji pokok dan bonusnya
daftarKaryawan.forEach((karyawan) => {
  const bonus = karyawan.hitungBonus();
  console.log(
    `Nama: ${
      karyawan.nama
    }, Gaji: Rp ${karyawan.gaji.toLocaleString()}, Bonus: Rp ${bonus.toLocaleString()}`
  );
});

// Menampilkan data dalam bentuk tabel
console.table(
  daftarKaryawan.map((k) => ({
    Nama: k.nama,
    Gaji: `Rp ${k.gaji.toLocaleString()}`,
    Bonus: `Rp ${k.hitungBonus().toLocaleString()}`,
  }))
);

// Menampilkan data setiap karyawan
daftarKaryawan.forEach((karyawan) => {
  const bonus = karyawan.hitungBonus();
  const total = karyawan.gaji + bonus;
  console.log(
    `Nama: ${
      karyawan.nama
    }, Gaji: Rp ${karyawan.gaji.toLocaleString()}, Bonus: Rp ${bonus.toLocaleString()}, Total: Rp ${total.toLocaleString()}`
  );
});

// Menghitung total keseluruhan gaji + bonus dari semua karyawan
const totalKeseluruhan = daftarKaryawan.reduce((sum, karyawan) => {
  return sum + karyawan.gaji + karyawan.hitungBonus();
}, 0);

// Menampilkan total keseluruhan gaji + bonus
console.log(
  `\nTotal Gaji + Bonus Semua Karyawan: Rp ${totalKeseluruhan.toLocaleString()}`
);

// Buat data dalam bentuk array objek untuk tabel
const dataTabel = daftarKaryawan.map((karyawan) => {
  const bonus = karyawan.hitungBonus();
  const total = karyawan.gaji + bonus;
  return {
    Nama: karyawan.nama,
    "Gaji Pokok": `Rp ${karyawan.gaji.toLocaleString()}`,
    Bonus: `Rp ${bonus.toLocaleString()}`,
    "Total Gaji + Bonus": `Rp ${total.toLocaleString()}`,
  };
});

// Tampilkan tabel di console
console.table(dataTabel);

// Menampilkan total keseluruhan gaji + bonus
console.log(
  `\nTotal Gaji + Bonus Semua Karyawan: Rp ${totalKeseluruhan.toLocaleString()}`
);
