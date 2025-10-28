class fruitBasket {
    constructor() {
        this.fruitBasket= [];
    }
    additem(fruit) {
        this.fruitBasket.push(fruit);
    }
    removeitem() {
        this.fruitBasket.pop();
    }
    getInformation() {
        return console.log(`Daftar buah dalam keranjang: ${this.fruitBasket}`);
    }

}


const basket = new fruitBasket();
basket.additem("apel");
basket.additem("pisang");
basket.additem("mangga");
basket.getInformation();
basket.removeitem();
basket.getInformation();