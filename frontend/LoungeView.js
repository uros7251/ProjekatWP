import { TableUI } from "./TableUI.js";
import { Menu } from "./Menu.js";

export class LoungeView {
    constructor(lounge) {
        // properties
        this.lounge = lounge;
        this.header = document.createElement("h1");
        this.tableLayout = document.createElement("div");
        this.tableUI = new TableUI(lounge);
        this.menuView = document.createElement("div");
        this.newMenuDiv = document.createElement("div");

        this.header.innerHTML = lounge.name;
        document.querySelector("header").appendChild(this.header);
        this.tableLayout.classList.add("TableLayout");
        let count = 0;
        this.lounge.tableLayout.forEach((element) => {
            const row = document.createElement("div");
            row.classList.add("LoungeRow");
            this.tableLayout.appendChild(row);
            for (let i = 0; i < element; i++) {
                const localCount = ++count;
                const table = document.createElement("div");
                table.classList.add("TableSquare");
                table.innerHTML = "Table " + localCount;
                table.onclick = ev => {
                    this.tableUI.setWorkingTable(this.lounge.tables[localCount-1]);
                }
                row.appendChild(table);
            }
        });

        this.menuView.classList.add("Menus");
        this.newMenuDiv.classList.add("NewMenuDiv");
        this.newMenuDiv.innerHTML = "Click for a new menu";
        this.newMenuDiv.onclick = ev => {
            const name = prompt("How would you like to call a new menu?");
            if (name !== null) {
                this.lounge.addMenu(new Menu(name));
            }
        }
        this.lounge.menus.forEach(elem => {
            const removeButton = document.createElement("button");
            removeButton.innerHTML = "Delete menu";
            removeButton.classList.add("RemoveMenuButton");
            removeButton.onclick = ev => {
                this.lounge.removeMenu(elem.name);
            }
            const div = elem.getMenuUI().itemList;
            div.appendChild(removeButton);
            this.menuView.appendChild(div);
        });
    }
    addMenu(menu) {
        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Delete menu";
        removeButton.classList.add("RemoveMenuButton");
        removeButton.onclick = ev => {
            this.lounge.removeMenu(menu.name);
        }
        const div = menu.getMenuUI().itemList;
        div.appendChild(removeButton);
        this.menuView.appendChild(div);
        this.tableUI.addMenu(menu);
    }
    removeMenu(index) {
        this.menuView.removeChild(this.menuView.childNodes[index]);
        this.tableUI.removeMenu(index);
    }
    appendTo(parent) {
        parent.appendChild(this.tableLayout);
        parent.appendChild(this.tableUI.divWrapper);
        parent.appendChild(document.createElement("hr"));
        parent.appendChild(this.menuView);
        parent.appendChild(this.newMenuDiv);
    }
}