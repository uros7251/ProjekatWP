export class MenuEntry {
    constructor(name, price){
        this.name = name;
        this.price = price;
        this.description = null;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    hasDescription() {
        return this.description !== null && this.description !== "";
    }
    getPrice() {
        return this.price;
    }
    setPrice(newPrice) {
        this.price = newPrice;
    }
}