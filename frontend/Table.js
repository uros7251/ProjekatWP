import {Order} from './Order.js';
import {OrdersBoard} from './OrdersBoard.js';

export class Table {
    constructor(id) {
        this.id = id;
        this.occupied = false;
        this.orders = [];
        this.board = null;
        this.paid = 0;
    }
    setNewBoard() {
        this.board = new OrdersBoard(this);
    }
    getBoardRoot() {
        if (this.board === null) {
            this.board = new OrdersBoard(this);
        }
        return this.board.rootElement;
    }
    placeAnOrder(menu, entryID, count = 1) {
        if (this.occupied === false) {
            this.occupied = true;
        }
        const menuEntry = menu.getEntryByID(entryID);
        if (menuEntry === undefined) {
            return null;
        }
        else {
            const order = new Order(menuEntry, count);
            this.orders.push(order);
            if (this.board != null) {
                this.board.addOrder(order);
                this.board.updateTotals();
            }
            return order;
        }
    }
    removeOrder(order) {
        const index = this.orders.findIndex(elem => elem === order);
        if (index !== undefined) {
            this.orders.splice(index, 1);
        }
    }
    removeAllNamed(name) {
        this.orders.splice(this.orders.findIndex(elem => elem.menuEntry.name === name), 1);
    }
    getOrders() {
        return this.orders;
    }
    totalCost() {
        return this.orders.reduce((total, elem) => total + elem.getTotalPrice(), 0);
    }
    moneyToPay() {
        return this.totalCost() - this.paid;
    }
    pay() {
        // poziv ka serveru, upis placanja u bazu
        this.paid = this.totalCost();
        this.board.updateTotals();
    }
    freeTable() {
        if (this.moneyToPay() > 0) {
            alert("Table you want to mark as free has some unpaid bills. Press Pay button if all the obligations are settled.");
            return false;
        }
        this.occupied = false;
        this.orders = [];
        this.paid = 0;
        this.setNewBoard();
        return true;
    }
    getStatus() {
        switch(this.status) {
            case 0:
                return "Free";
            case 1:
                return "Occupied";
            case 2:
                return "Paid";
        }
    }
}