export class Order {
    constructor(menuEntry, count) {
        this.menuEntry = menuEntry;
        this.count = count;
    }
    increaseCount(howMuch) {
        if (this.count + howMuch > 0) {
            this.count += howMuch;
        }
        return this.count;
    }
    getName() {
        return this.menuEntry.name;
    }
    getTotalPrice() {
        return this.menuEntry.price * this.count;
    }
}