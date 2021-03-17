export class OrdersBoard {
    constructor(table) {
        // properties
        this.table = table;
        this.rootElement = document.createElement("table");
        // initial setup
        this.rootElement.classList.add("ordersTable");

        const finalRow = document.createElement("tr");
        finalRow.classList.add("finalRow");
        const totalCostLabel = document.createElement("td");
        totalCostLabel.innerHTML = "Total: ";
        finalRow.appendChild(totalCostLabel);
        const totalCost = document.createElement("td");
        totalCost.innerHTML = "$" + this.table.totalCost();
        finalRow.appendChild(totalCost);
        const leftToPayLabel = document.createElement("td");
        leftToPayLabel.innerHTML = "Remains: ";
        finalRow.appendChild(leftToPayLabel);
        const leftToPay = document.createElement("td");
        leftToPay.innerHTML = "$" + this.table.moneyToPay();
        finalRow.appendChild(leftToPay);
        this.rootElement.appendChild(finalRow);
        
        this.table.orders.forEach(element => {
            this.addOrder(element);
        });
    }
    addOrder(order) {
        const row = document.createElement("tr");
        this.rootElement.insertBefore(row, this.rootElement.lastChild);

        const orderName = document.createElement("td");
        orderName.innerHTML = order.getName();
        row.appendChild(orderName);

        const orderCount = document.createElement("td");
        orderCount.innerHTML = "x" + order.count;
        row.appendChild(orderCount);

        const buttons = document.createElement("td");
        const decButton = document.createElement("button");
        decButton.innerHTML = "-";
        decButton.onclick = ev => {
            orderCount.innerHTML = "x" + order.increaseCount(-1);
            updateOrderPrice();
            this.updateTotals();
        }
        const incButton = document.createElement("button");
        incButton.innerHTML = "+";
        incButton.onclick = ev => {
            orderCount.innerHTML = "x" + order.increaseCount(1);
            updateOrderPrice();
            this.updateTotals();
        }
        const remButton = document.createElement("button");
        remButton.innerHTML = "🗑";
        remButton.onclick = ev => {
            this.table.removeOrder(order);
            this.rootElement.removeChild(row);
            this.updateTotals();
        }
        buttons.appendChild(decButton);
        buttons.appendChild(incButton);
        buttons.appendChild(remButton);
        row.appendChild(buttons);

        const orderPrice = document.createElement("td");
        orderPrice.innerHTML = "$" + order.getTotalPrice();
        function updateOrderPrice() {
            orderPrice.innerHTML = "$" + order.getTotalPrice();
        }
        row.appendChild(orderPrice);
    }
    updateTotals() {
        this.rootElement.lastChild.childNodes[1].innerHTML = "$" + this.table.totalCost();
        this.rootElement.lastChild.childNodes[3].innerHTML = "$" + this.table.moneyToPay();
    }
}