class employee {
  constructor() {
    this.baseSalary = 50000000;
    this.baseparttimeSalary = 50000;
  }

  calculateSalary() {}
}
class FullTimeEmployee extends employee {
  calculateSalary() {
    return console.log(`Gaji Karyawan Full Time adalah Rp. ${this.baseSalary}`);
  }
}
class PartTimeEmployee extends employee {
  calculateSalary(workHours) {
    this.baseSalary = this.baseparttimeSalary * workHours;

    return console.log(`Gaji Karyawan Part Time adalah Rp. ${this.baseSalary}`);
  }
}
const fullTimeEmp = new FullTimeEmployee();
const partTimeEmp = new PartTimeEmployee();

fullTimeEmp.calculateSalary();
partTimeEmp.calculateSalary(8);
