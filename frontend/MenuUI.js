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
        heading.ondblclick = ev => {
            const newName = prompt("Edit menu name:", this.menu.name);
            if (this.menu.lounge !== null &&
                newName !== this.menu.name &&
                this.menu.lounge.menuNameValid(newName)) {

                fetch("https://localhost:5001/Lounge/EditMenu", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: this.menu.id,
                        name: newName
                    })
                }).then(response => {
                    if (response.ok) {
                        this.menu.updateName(newName);
                        heading.innerHTML = this.menu.name;
                    }
                    else if (response.status === 400) {
                        response.json().then(data => {
                            alert("Server Error: " + data.error);
                        })
                    }
                    else {
                        alert("Server Error: Creation failed!");
                    }
                });
            }
            else {
                alert("Client Error: Creation failed!");
            }
        }
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
            fetch("https://localhost:5001/Lounge/CreateMenuEntry/" + this.menu.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: inputName.value,
                    price: parseFloat(inputPrice.value)
                })
            }).then(p => {
                if (p.ok) {
                    p.json().then(data => {
                        this.menu.addMenuEntry(parseInt(data.entryID), inputName.value, parseFloat(inputPrice.value));
                        inputName.value = "";
                        inputPrice.value = "";
                    });
                }
                else if (p.status === 400) {
                    p.json().then(data => {
                        console.log(data.errors);
                        alert("Server error: " + data.error);
                    });
                }
                else {
                    alert("Server error: Creation of Menu entry failed");
                }
            });
            // zahtev serveru za kreiranje novog entry-a
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
            // zahtev ka serveru
            fetch("https://localhost:5001/Lounge/DeleteMenuEntry/" + item.id, {
                method: "DELETE"
            }).then(response => {
                if (response.ok) {
                    this.menu.removeEntryByID(item.id);
                }
                else if (response.status === 400) {
                    response.json().then(data => {
                        alert("Server Error: " + data.error);
                    });
                }
                else {
                    alert("Server Error: Deletion failed");
                }
            })
        };
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        this.itemList.querySelector(".MenuList").insertBefore(row, this.itemList.querySelector(".NewEntryRow"));

        const option = document.createElement("option");
        option.value = item.id;
        option.innerHTML = item.name;
        this.itemPicker.appendChild(option);
    }
    removeItem(index) {
        const table = this.itemList.querySelector(".MenuList");
        table.removeChild(table.childNodes[index]);
        this.itemPicker.removeChild(this.itemPicker.childNodes[index]);
    }
}