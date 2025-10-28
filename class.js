class Karyawan {
    constructor(nama, jabatan, gaji) {
        this.nama = nama;
        this.jabatan = jabatan;
        this.gaji = gaji;
    }
    info(){
        return console.log(
         `${this.nama} bekerja diperusahaan dengan jabatan ${this.jabatan} dengan gaji ${this.gaji}`);
    }
    infoGaji(){
        return console.log(`Gaji ${this.nama} adalah ${this.gaji}`);
    }
}

const karyawan1 = new Karyawan("Tama", "Manager", "10.000.000");
karyawan1.info();
karyawan1.infoGaji();


