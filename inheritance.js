class Person {
    constructor(name) {
        this.name = name;
    }
    IntroduceSelf() {
       console.log(`Hi,I'm ${this.name}`);
    }
}

class Profesor extends Person {
    teaches;

    constructor(name, teaches) {
        super(name);
        this.teaches = teaches;
    }

    IntroduceSelf() {
        console.log(
            `My name is ${this.name}, and I will be your ${this.teaches} professor.`);
    }
}

const profesor1 = new Profesor("John", "Mathematics");
profesor1.IntroduceSelf();