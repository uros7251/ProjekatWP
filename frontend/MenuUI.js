export class MenuUI {
    constructor(menu) {
        this.menu = menu;
        this.itemPicker = document.createElement("select");
        this.itemList = document.createElement("div");
        
        this.itemPicker.classList.add("ItemPicker");
        // create Table of Menu Entries
        this.itemList.classList.add("MenuView");
        const heading = document.createElement("h3");
        heading.classList.add("MenuHeading");
        heading.innerHTML = this.menu.name;
        this.itemList.appendChild(heading);

        const table = document.createElement("table");
        table.classList.add("MenuList");
        this.itemList.appendChild(table);
        const newEntry = document.createElement("tr");
        newEntry.classList.add("NewEntryRow");
        table.appendChild(newEntry);
        const inputName = document.createElement("input");
        inputName.type = "text";
        newEntry.appendChild(inputName);
        const inputPrice = document.createElement("input");
        inputPrice.type = "number";
        newEntry.appendChild(inputPrice);
        const buttonNew = document.createElement("button");
        buttonNew.innerHTML = "+";
        buttonNew.onclick = ev => {
            const entry = this.menu.addMenuEntry(inputName.value, parseFloat(inputPrice.value));
            inputName.value = "";
            inputPrice.value = "";
        }
        newEntry.appendChild(buttonNew);

        this.menu.content.forEach(element => {
            this.addItem(element);
        });

    }
    addItem(item) {
        const row = document.createElement("tr");
        const entryName = document.createElement("td");
        entryName.innerHTML = item.name;
        row.appendChild(entryName);
        if (item.hasDescription()) {
            let entryDescription = document.createElement("label");
            entryDescription.innerHTML = "\t-\t" + item.description;
            entryDescription.style.fontStyle = "italic";
            entryName.appendChild(entryDescription);
        }
        const entryPrice = document.createElement("td");
        entryPrice.innerHTML = "$" + item.price;
        row.appendChild(entryPrice);
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "🗑";
        deleteButton.onclick = ev => {
            this.menu.removeEntryByName(item.name);
        };
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        this.itemList.querySelector(".MenuList").insertBefore(row, this.itemList.querySelector(".NewEntryRow"));

        const option = document.createElement("option");
        option.value = item.name;
        option.innerHTML = item.name;
        this.itemPicker.appendChild(option);
    }
    removeItem(index) {
        const table = this.itemList.querySelector(".MenuList");
        table.removeChild(table.childNodes[index]);
        this.itemPicker.removeChild(this.itemPicker.childNodes[index]);
    }
}