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
                    this.tableUI.setWorkingTable(this.lounge.tables[localCount - 1]);
                }
                row.appendChild(table);
            }
        });

        this.menuView.classList.add("Menus");
        this.newMenuDiv.classList.add("NewMenuDiv");
        this.newMenuDiv.innerHTML = "Click for a new menu";
        this.newMenuDiv.onclick = ev => {
            const menuName = prompt("How would you like to call a new menu?");
            if (this.lounge.menuNameValid(menuName)) {
                // poziv ka serveru, kreiranje menija u bazi, server vraca ID koji se koristi za upis
                fetch("https://localhost:5001/Lounge/CreateMenu/" + menuName, {
                    method: "POST"
                }).then(p => {
                    if (p.ok) {
                        p.json().then(data => {
                            this.lounge.addMenu(new Menu(data.id, menuName));
                        })
                    }
                    else if (p.status == 400) {
                        p.json().then(data => {
                            alert("Server Error: " + data.error);
                        })
                    }
                })
            }
        }
        this.lounge.menus.forEach(elem => {
            const removeButton = document.createElement("button");
            removeButton.innerHTML = "Delete menu";
            removeButton.classList.add("RemoveMenuButton");
            removeButton.onclick = ev => {
                // zahtev ka serveru
                this.onRemoveMenuCommand(elem);
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
            this.onRemoveMenuCommand(menu);
        }
        const div = menu.getMenuUI().itemList;
        div.appendChild(removeButton);
        this.menuView.appendChild(div);
        this.tableUI.addMenu(menu);
    }
    updateMenuName(index, newName) {
        this.tableUI.updateMenuName(index, newName);
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
    onRemoveMenuCommand(menu) {
        fetch("https://localhost:5001/Lounge/DeleteMenu/" + menu.id, {
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
                this.lounge.removeMenu(menu.id);
            }
            else if (response.status == 400) {
                response.json().then(data => {
                    alert("Server Error: " + data.error);
                });
            }
            else {
                alert("Server Error: Deletion failed");
            }
        });
    }
}