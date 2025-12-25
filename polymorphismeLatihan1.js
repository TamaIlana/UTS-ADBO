class vechicle {
  move() {
    console.log("Kendaraan bergerak");
  }
}

class car extends vechicle {
  move() {
    console.log("Mobil di jalan raya");
  }
}

class boat extends vechicle {
  move() {
    console.log("Kapal belayar di laut");
  }
}

class plane extends vechicle {
  move() {
    console.log("Pesawat terbang di udara");
  }
}

class rocket extends vechicle {
  move() {
    console.log("Roket meluncur ke luar angkasa");
  }
}

const Car = new car();
const Boat = new boat();
const Plane = new plane();
const Rocket = new rocket();

Car.move();
Boat.move();
Plane.move();
Rocket.move();
