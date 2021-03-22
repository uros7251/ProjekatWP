import {Table} from './Table.js';
import { LoungeView } from './LoungeView.js';

export class Lounge {
    constructor(name, tableLayout, menus = []) {
        this.name = name;
        this.tableLayout = tableLayout;
        this.menus = [];
        this.tables = [];
        this.view = null;
        menus.forEach(menu => {
            this.addMenu(menu);
        });
        const noTables = tableLayout.reduce((sum, elem) => sum + elem, 0);
        for (let i = 0; i < noTables; ) {
            this.tables.push(new Table(++i));
        }
    }
    menuNameValid(name) {
        if (name === null) {
            return false;
        }
        else if (this.menus.some(menu => menu.name === name)) {
            return false;
        }
        return true;
    }
    addMenu(...menu) {
        menu.forEach(elem => {
            this.menus.push(elem);
            elem.setLounge(this);
            if (this.view !== null) {
                this.view.addMenu(elem);
            }
        });
    }
    removeMenu(menuID) {
        const index = this.menus.findIndex(elem => elem.id === menuID);
        this.menus.splice(index, 1);
        this.view.removeMenu(index);
    }
    getMenu(menuID) {
        return this.menus.find(elem => elem.id === menuID);
    }
    drawLoungeView(parent) {
        this.view = new LoungeView(this);
        if (parent !== null) {
            this.view.appendTo(parent);
        }
        return this.view;
    }
    updateMenuView(menuID) {
        const index = this.menus.findIndex(menu => menu.id = menuID);
        this.view.updateMenuName(index, this.menus[index].name);
    }
}