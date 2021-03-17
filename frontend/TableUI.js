export class TableUI {
    constructor(lounge) {
        // properties include a reference to the current table, a wrapper div of user interface and a reference to the table of orders
        this.divWrapper = document.createElement("div");
        this.lounge = lounge;
        this.table = null;

        // creation of the structure of divs
        this.divWrapper.classList.add("TableUIWrapper");
        const heading =  document.createElement("h2");
        heading.classList.add("TableHeading");
        this.divWrapper.appendChild(heading)
        const div1 = document.createElement("div");
        div1.classList.add("BoardnCommands");
        this.divWrapper.appendChild(div1);
        const div2 = document.createElement("div");
        div2.classList.add("OrderSelector");

        this.divWrapper.appendChild(div2);
        const div11 = document.createElement("div");
        div11.classList.add("TableBoard");
        div1.appendChild(div11);
        const div12 = document.createElement("div");
        div12.classList.add("TableCommands");
        div1.appendChild(div12);
        const div21 = document.createElement("div");
        div21.classList.add("Picker");
        div2.appendChild(div21);
        const div22 = document.createElement("div");
        div22.classList.add("Picker");
        div2.appendChild(div22);
        const div23 = document.createElement("div");
        div23.classList.add("Picker");
        div2.appendChild(div23);

        // add command buttons to div12
        const payButton = document.createElement("button");
        payButton.innerHTML = "Pay";
        payButton.onclick = ev => {
            this.table.pay();
        };
        div12.appendChild(payButton);
        const freeButton = document.createElement("button");
        freeButton.innerHTML = "Free table";
        freeButton.onclick = ev => {
            if (this.table !== null && this.table.freeTable() === true) {
                div11.replaceChild(this.table.getBoardRoot(), div11.firstChild);
            }
        };
        div12.appendChild(freeButton);
        
        // create order picker allowing one to choose menu, menu item and count
        const menuPickerLabel = document.createElement("label");
        menuPickerLabel.innerHTML = "Menu: ";
        div21.appendChild(menuPickerLabel);
        const menuPicker = document.createElement("select");
        menuPicker.classList.add("MenuPicker");
        div21.appendChild(menuPicker);
        this.lounge.menus.forEach(menu => {
            this.addMenu(menu);
        });

        const itemPickerLabel = document.createElement("label");
        itemPickerLabel.innerHTML = "Item: ";
        div22.appendChild(itemPickerLabel);
        if (this.lounge.menus.length === 0) {
            const itemPicker = document.createElement("select");
            itemPicker.classList.add("ItemPicker");
            div22.appendChild(itemPicker); // default item picker
        }
        else { 
            div22.appendChild(this.lounge.menus[0].getMenuUI().itemPicker);
        }
        menuPicker.onchange = ev => {
            this.changeActiveMenu();
        };
        
        const countPickerLabel = document.createElement("label");
        countPickerLabel.innerHTML = "Amount: ";
        div23.appendChild(countPickerLabel);
        const countPicker = document.createElement("input");
        countPicker.classList.add("CountPicker");
        countPicker.type = "number";
        countPicker.value = 1;
        div23.appendChild(countPicker);

        const submitButton = document.createElement("button");
        submitButton.innerHTML = "Place an order";
        submitButton.onclick = ev => {
            if (this.table !== null) {
                const itemPicker = div22.querySelector(".ItemPicker");
                this.table.placeAnOrder(this.lounge.getMenu(menuPicker.value), itemPicker.value, parseInt(countPicker.value));
            }
            else {
                alert("You must choose a table first.");
            }
        };
        div2.appendChild(submitButton);
    }
    setWorkingTable(table) {
        this.table = table;
        this.divWrapper.childNodes[0].innerHTML = "Table " + table.id;  //  heading
        const board = this.divWrapper.querySelector(".TableBoard");
        if (board.hasChildNodes()){
            board.replaceChild(this.table.getBoardRoot(), board.firstChild);
        }
        else {
            board.appendChild(this.table.getBoardRoot());
        }
    }
    addMenu(menu) {
        const menuOption = document.createElement("option");
        menuOption.value = menu.name;
        menuOption.innerHTML = menu.name;
        this.divWrapper.querySelector(".MenuPicker").appendChild(menuOption);
        if (this.lounge.menus.length === 1) {
            this.changeActiveMenu();
        }
    }
    removeMenu(index) {
        const menuSelector = this.divWrapper.querySelector(".MenuPicker");
        menuSelector.removeChild(menuSelector.childNodes[index]);
        this.changeActiveMenu();
    }
    changeActiveMenu() {
        const menuPicker = this.divWrapper.querySelector(".MenuPicker");
        const menu = this.lounge.getMenu(menuPicker.value);
        if (menu === undefined) {
            const itemPicker = document.createElement("select");
            itemPicker.classList.add("ItemPicker");
            this.divWrapper.querySelector(".ItemPicker").replaceWith(itemPicker);
        }
        else {
            this.divWrapper.querySelector(".ItemPicker").replaceWith(menu.getMenuUI().itemPicker);
        }
    }
    appendTo(parent) {
        parent.appendChild(this.divWrapper);     
    }
}