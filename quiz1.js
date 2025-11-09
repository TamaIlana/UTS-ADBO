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
