class storeitem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    info() {
        return console.log(
            `Item ${this.name} memiliki harga ${this.price}`);
    }
}

    const item1 = new storeitem("Laptop", "15.000.000");
    item1.info();

