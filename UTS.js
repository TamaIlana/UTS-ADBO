// class Induk dari cuti
class Cuti {
  constructor(nama) {
    this.namaCuti = nama;
  }

  // Akan dioverride oleh class turunan → POLYMORPHISM
  getMaxKuota() {
    return 0;
  }

  getNama() {
    return this.namaCuti;
  }
}

// Child Class dari cuti
class CutiTahunan extends Cuti {
  constructor() {
    super("Cuti Tahunan");
  }

  getMaxKuota() {
    return 12; // override aturan kuota tahunan
  }
}

class CutiSakit extends Cuti {
  constructor() {
    super("Cuti Sakit");
  }

  getMaxKuota() {
    return 2; // override aturan kuota sakit
  }
}

class CutiMelahirkan extends Cuti {
  constructor() {
    super("Cuti Melahirkan");
  }

  getMaxKuota() {
    return 90; // override aturan melahirkan
  }
}

// Class Karyawan
class Karyawan {
  #kuotaCuti = {}; // PRIVATE → tidak bisa diakses langsung dari luar

  constructor(nama) {
    this.nama = nama;
  }

  setKuota(cuti, sisaKuota) {
    this.#kuotaCuti[cuti.constructor.name] = sisaKuota;
  }

  getKuota(cuti) {
    return this.#kuotaCuti[cuti.constructor.name] ?? 0;
  }

  kurangiKuota(cuti, durasi) {
    const key = cuti.constructor.name;
    this.#kuotaCuti[key] -= durasi;
  }
}

class PengajuanCuti {
  ajukan(karyawan, cuti, durasi) {
    const sisaKuota = karyawan.getKuota(cuti);

    console.log(`Mengajukan: ${cuti.getNama()} durasi ${durasi} hari`);
    console.log(`Sisa kuota anda: ${sisaKuota} hari`);

    // Validasi kuota
    if (durasi > sisaKuota) {
      return "Kuota anda tidak cukup untuk mengajukan cuti ini.";
    }

    // Jika kuota cukup
    karyawan.kurangiKuota(cuti, durasi);

    return `Pengajuan cuti berhasil! Sisa kuota anda sekarang: ${karyawan.getKuota(
      cuti
    )} hari.`;
  }
}

// Membuat objek jenis cuti (INHERITANCE + POLYMORPHISM)
const cutiTahunan = new CutiTahunan();
const cutiSakit = new CutiSakit();
const cutiMelahirkan = new CutiMelahirkan();

// Membuat karyawan
const karyawan = new Karyawan("Pratama");

// Set kuota sesuai aturan
karyawan.setKuota(cutiTahunan, 12);
karyawan.setKuota(cutiSakit, 2);
karyawan.setKuota(cutiMelahirkan, 90);

// Buat proses pengajuan cuti
const pengajuan = new PengajuanCuti();

// Contoh pengajuan 1
console.log(pengajuan.ajukan(karyawan, cutiTahunan, 5));
console.log("\n");

// Contoh pengajuan 1 → akan ditolak
console.log(pengajuan.ajukan(karyawan, cutiTahunan, 8));
console.log("\n");

// Contoh pengajuan 2 → akan ditolak
console.log(pengajuan.ajukan(karyawan, cutiSakit, 3));
console.log("\n");

// Contoh pengajuan melahirkan
console.log(pengajuan.ajukan(karyawan, cutiMelahirkan, 30));
