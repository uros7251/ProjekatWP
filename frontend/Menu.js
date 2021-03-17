import {MenuEntry} from './MenuEntry.js';
import { MenuUI } from './MenuUI.js';

export class Menu {
    constructor(name) {
        this.name = name;
        this.content = [];
        this.menuUI = null;
    }
    addMenuEntry(name, price) {
        const newEntry = new MenuEntry(name, price)
        this.content.push(newEntry);
        
        if (this.menuUI !== null) {
            this.menuUI.addItem(newEntry);
        }

        return newEntry;
    }
    removeEntryByName(name) {
        const index = this.content.findIndex(el => el.name === name);
        this.content.splice(index, 1);
        
        if (this.menuUI !== null) {
            this.menuUI.removeItem(index);
        }
    }
    getEntryByName(name) {
        return this.content.find(el => el.name === name);
    }
    getMenuUI() {
        if (this.menuUI === null) {
            this.menuUI = new MenuUI(this);
        }
        return this.menuUI;
    }
}