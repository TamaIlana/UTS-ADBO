console.log("polymorphisme");

class Animal {
  speak() {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog sound like barks");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Cat sound like meows");
  }
}

const dog = new Dog();
const cat = new Cat();

dog.speak();
cat.speak();
