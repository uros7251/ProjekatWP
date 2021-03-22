import {MenuEntry} from './MenuEntry.js';
import { MenuUI } from './MenuUI.js';

export class Menu {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.content = [];
        this.lounge = null;
        this.menuUI = null;
    }
    setLounge(lounge) {
        this.lounge = lounge;
    }
    updateName(newName) {
        this.name = newName;
        this.lounge.updateMenuView(this.id);
    }
    addMenuEntry(id, name, price) {
        const newEntry = new MenuEntry(id, name, price)
        this.content.push(newEntry);
        
        if (this.menuUI !== null) {
            this.menuUI.addItem(newEntry);
        }

        return newEntry;
    }
    removeEntryByID(id) {
        // poziv ka serveru, ceka se potvrda uspesnosti
        const index = this.content.findIndex(el => el.id === id);
        this.content.splice(index, 1);
        
        if (this.menuUI !== null) {
            this.menuUI.removeItem(index);
        }
    }
    getEntryByID(id) {
        return this.content.find(el => el.id === id);
    }
    getMenuUI() {
        if (this.menuUI === null) {
            this.menuUI = new MenuUI(this);
        }
        return this.menuUI;
    }
}