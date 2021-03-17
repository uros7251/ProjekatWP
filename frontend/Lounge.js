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
    addMenu(...menu) {
        menu.forEach(elem => {
            this.menus.push(elem);
            if (this.view !== null) {
                this.view.addMenu(elem);
            }
        });
    }
    removeMenu(menuName) {
        const index = this.menus.findIndex(elem => elem.name === menuName);
        this.menus.splice(index, 1);
        this.view.removeMenu(index);
    }
    getMenu(menuName) {
        return this.menus.find(elem => elem.name === menuName);
    }
    drawLoungeView(parent) {
        this.view = new LoungeView(this);
        if (parent !== null) {
            this.view.appendTo(parent);
        }
        return this.view;
    }
}