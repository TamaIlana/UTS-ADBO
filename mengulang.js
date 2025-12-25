// sebuah class adalah blueprint untuk membuat object
class Karyawan {
    // constructor adalah method khusus untuk menginisialisasi object
    constructor(nama, jabatan, gaji) {
        this.nama = nama;
        this.jabatan = jabatan;
        this.gaji = gaji;
    }   
    // method info untuk menampilkan informasi karyawan
    info(){
        return console.log(
         `${this.nama} bekerja diperusahaan dengan jabatan ${this.jabatan} dengan gaji ${this.gaji}`);
    }
    // method infoGaji untuk menampilkan gaji karyawan
    infoGaji(){
        return console.log(`Gaji ${this.nama} adalah ${this.gaji}`);
    }
    // kamu bisa menambahkan lebih banyak method sesuai kebutuhan
}

// membuat object karyawan1 dari class Karyawan
const karyawan1 = new Karyawan("Tama", "Manager", "10.000.000");
// memanggil method info dan infoGaji dari object karyawan1
karyawan1.info();
karyawan1.infoGaji();

// class debgan blueprint berupa array of object
class warehouse {
    constructor() {
        this.items = [];
    }   
// method untuk menambahkan item ke dalam warehouse
    addItem(name, quantity) {
        this.items.push({ name, quantity });
    }   
// method untuk menampilkan semua item di dalam warehouse
    displayItems() {
        console.log("Items in Warehouse:");
        this.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name} - Quantity: ${item.quantity}`);
        });
    }
}

// membuat object warehouse1 dari class warehouse
const warehouse1 = new warehouse();
// menambahkan item ke dalam warehouse1
warehouse1.addItem("Laptop", 10);
warehouse1.addItem("Smartphone", 25);
// menampilkan semua item di dalam warehouse1
warehouse1.displayItems();


// class untuk menhitung base gaji dan part time gaji
class employee {
    constructor() {
        this.baseSalary = 50000000;
        this.baseparttimeSalary = 50000;
    }   
    // method calculateSalary untuk menghitung gaji
    calculateSalary() {}
}
// class turunan untuk karyawan full time
class FullTimeEmployee extends employee {
    calculateSalary() {
        return console.log(`Gaji Karyawan Full Time adalah Rp. ${this.baseSalary}`);
    }
}
// class turunan untuk karyawan part time
class PartTimeEmployee extends employee {
    calculateSalary(workHours) {
        this.baseSalary = this.baseparttimeSalary * workHours;      
        return console.log(`Gaji Karyawan Part Time adalah Rp. ${this.baseSalary}`);
    }
}
// membuat object fullTimeEmp dari class FullTimeEmployee
const fullTimeEmp = new FullTimeEmployee();
// membuat object partTimeEmp dari class PartTimeEmployee
const partTimeEmp = new PartTimeEmployee();
// memanggil method calculateSalary dari object fullTimeEmp
fullTimeEmp.calculateSalary();
// memanggil method calculateSalary dari object partTimeEmp dengan parameter workHours
partTimeEmp.calculateSalary(8);

// mempelajari lebih lanjut tentang class, inheritance, dan polymorphism di JavaScript untuk membuat kode yang lebih kompleks dan dinamis.

// inheritance adalah konsep dimana sebuah class dapat mewarisi properti dan method dari class lain
// polymorphism adalah konsep dimana sebuah method dapat memiliki banyak bentuk tergantung pada class yang menggunakannya

// ini adalah contoh sederhana dari inheritance 
// class animal sebagai class induk

class Animal {
    // method untuk mengeluarkan suara
    speak() {
        console.log("The animal makes a sound");
    }

}
class Dog extends Animal {
    // method speak di override untuk class Dog
    speak() {
        console.log("The dog barks");
    }   
}
class Cat extends Animal {
    // method speak di override untuk class Cat
    speak() {
        console.log("The cat meows");
    }   
}
// membuat object dog dari class Dog
const dog = new Dog();
// membuat object cat dari class Cat
const cat = new Cat();
// memanggil method speak dari object dog
dog.speak();
// memanggil method speak dari object cat
cat.speak();    

// dengan konsep inheritance dan polymorphism, kamu dapat membuat kode yang lebih terstruktur dan mudah untuk dikembangkan.

// ini adalah contoh sederhana dari polymorphism dengan class employee, FullTimeEmployee, dan PartTimeEmployee
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }   
    // method untuk menghitung bonus
    calculateBonus() {
        return 0;
    }   
}   
// class turunan untuk karyawan tetap
class FullTimeEmployee extends Employee {
    // method calculateBonus di override untuk karyawan tetap
    calculateBonus() {
        return this.salary * 0.1;
    }   
}
// class turunan untuk karyawan kontrak
class PartTimeEmployee extends Employee {
    // method calculateBonus di override untuk karyawan kontrak 
    calculateBonus() {
        return this.salary * 0.05;
    }   
}   
// membuat array untuk menyimpan daftar karyawan tetap
const fullTimeEmployees = [
    new FullTimeEmployee("Budi", 8000000),
    new FullTimeEmployee("Ani", 7500000),
    new FullTimeEmployee("Wati", 9000000),  
];
// membuat array untuk menyimpan daftar karyawan kontrak
const partTimeEmployees = [                 
    new PartTimeEmployee("Sita", 6000000),
    new PartTimeEmployee("Rina", 5500000),
    new PartTimeEmployee("Dewi", 5000000),  
    new PartTimeEmployee("Tina", 6500000),
];  
// menggabungkan semua karyawan ke dalam satu array
const allEmployees = [...fullTimeEmployees, ...partTimeEmployees];
// menghitung total bonus seluruh karyawan
let totalBonus = 0;
for (const employee of allEmployees) {
    totalBonus += employee.calculate    
Bonus();
}
// menampilkan total bonus yang harus dibayarkan
console.log(`Total bonus yang harus dibayarkan: Rp${totalBonus}`);  
// menampilkan total bonus dengan format yang lebih rapi
console.log(`\nTotal Bonus Semua Karyawan: Rp ${totalBonus.toLocaleString()}`); 
// menampilkan daftar karyawan beserta gaji dan bonusnya
console.log(allEmployees);  
// menampilkan data setiap karyawan beserta bonusnya    
allEmployees.forEach((employee) => {        
    console.log(`${employee.name} - Gaji: Rp ${employee.salary.toLocaleString()} - Bonus: Rp ${employee.calculateBonus().toLocaleString()}`);    
});
// menampilkan data setiap karyawan beserta gaji pokoknya
allEmployees.forEach((employee) => {        
    console.log(`Nama: ${employee.name}, Gaji: Rp ${employee.salary.toLocaleString()}`);    
}); 
// menampilkan data setiap karyawan beserta gaji pokok dan bonusnya
allEmployees.forEach((employee) => {        
    const bonus = employee.calculateBonus();        
    console.log(`Nama: ${employee.name}, Gaji: Rp ${employee.salary.toLocaleString()}, Bonus: Rp ${bonus.toLocaleString()}`);    
});

// dengan konsep inheritance dan polymorphism, kamu dapat membuat kode yang lebih terstruktur dan mudah untuk dikembangkan.

// latihan polymorphism dengan class vechicle dan turunannya
class Vechicle {
    // method untuk menampilkan gerakan kendaraan
    move() {
        console.log("Kendaraan bergerak");
    }
}
// class turunan untuk mobil
class Car extends Vechicle {
    // method move di override untuk class Car
    move() {
        console.log("Mobil di jalan raya");
    }
}
// class turunan untuk kapal
class Boat extends Vechicle {       
    // method move di override untuk class Boat
    move() {
        console.log("Kapal belayar di laut");
    }       
}
// class turunan untuk pesawat
class Plane extends Vechicle {
    // method move di override untuk class Plane
    move() {
        console.log("Pesawat terbang di udara");
    }
}   
// class turunan untuk roket
class Rocket extends Vechicle {
    // method move di override untuk class Rocket   
    move() {
        console.log("Roket meluncur ke luar angkasa");
    }   
}   
// membuat object Car dari class Car
const Car = new Car();
// membuat object Boat dari class Boat
const Boat = new Boat();    
// membuat object Plane dari class Plane
const Plane = new Plane();  
// membuat object Rocket dari class Rocket
const Rocket = new Rocket();

// memanggil method move dari object Car

Car.move();
// memanggil method move dari object Boat
Boat.move();    
Plane.move();
// memanggil method move dari object Rocket
Rocket.move();  
// dengan konsep inheritance dan polymorphism, kamu dapat membuat kode yang lebih terstruktur dan mudah untuk dikembangkan.

// latihan inheritance dengan class Person dan Profesor
class Person {
    constructor(name) { 
        this.name = name;
    }   
    // method untuk memperkenalkan diri
    introduceSelf() {
       console.log(`Hi, I'm ${this.name}`);
    }   
}
// class turunan untuk Profesor
class Profesor extends Person {
    teaches;
    constructor(name, teaches) {
        super(name);
        this.teaches = teaches;
    }   
    // method introduceSelf di override untuk class Profesor
    introduceSelf() {
        console.log(
            `My name is ${this.name}, and I will be your ${this.teaches} professor.`);
    }   
}   
// membuat object profesor1 dari class Profesor
const profesor1 = new Profesor("John", "Mathematics");  
// memanggil method introduceSelf dari object profesor1
profesor1.introduceSelf();

// dengan konsep inheritance, kamu dapat membuat kode yang lebih terstruktur dan mudah untuk dikembangkan.




        