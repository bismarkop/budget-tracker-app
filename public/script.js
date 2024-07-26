const transactions = JSON.parse(sessionStorage.getItem("transactions")) || [];

const balance = document.getElementById("balance");
const expense = document.getElementById("expense");
const income = document.getElementById("income");
const form = document.getElementById("transactionForm");
const nameOf = document.getElementById("name");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const list = document.getElementById("transactionList");
const tranStatus = document.getElementById("status");

// Transactions Page
const transactions2 = JSON.parse(sessionStorage.getItem("transactions2")) || [];
const list2 = document.getElementById("transactionList2");

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "always",
});

form.addEventListener("submit", addTransaction);

function renderList() {
  list.innerHTML = "";

  transactions.forEach(({ id, name, amount, date, type }) => {
    let sign = "income" === type ? 1 : -1;
    const li = document.createElement("li");

    li.innerHTML = `
            <div id = "transactionInfo">
              <h3>Transactions</h3>
              <p>${new Date(date).toLocaleDateString()}</p>
              <div class = "name">
                <h4>${name}</h4>
              </div>
              <div class="amount ${type}">
                <span>${formatter.format(amount * sign)}</span>
              </div>

              <div class="action">
              <svg width="150" height="100" xmlns="http://www.w3.org/2000/svg" onclick="deleteTransaction(${id})">
                <circle cx="75" cy="50" r="20" fill="red" />
                <text x="75" y="60" font-size="30" text-anchor="middle" fill="white">X</text>
                Sorry, your browser does not support inline SVG.  
              </svg> 
            </div>
            </div>
          `;
    list.appendChild(li);
  });
}

renderList();
updateTotal();

function addTransaction(e) {
  e.preventDefault();

  const formData = new FormData(this);

  transactions.push({
    id: transactions.length + 1,
    name: formData.get("name"),
    category: formData.get("category"),
    amount: parseFloat(formData.get("amount")),
    date: new Date(formData.get("date")),
    type: "on" === formData.get("type") ? "income" : "expense",
  });

  this.reset();
  saveTransaction();
  renderList();
  updateTotal();
}

function deleteTransaction(id) {
  let index = transactions.findIndex((trans) => trans.id === id);
  transactions.splice(index, 1);

  saveTransaction();
  renderList();
  updateTotal();
}

function saveTransaction() {
  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  sessionStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateTotal() {
  let incomeTotal = transactions
    .filter((trans) => trans.type === "income")
    .reduce((total, trans) => total + trans.amount, 0);

  let expenseTotal = transactions
    .filter((trans) => trans.type === "expense")
    .reduce((total, trans) => total + trans.amount, 0);

  let balanceTotal = incomeTotal - expenseTotal;

  balance.textContent = formatter.format(balanceTotal).substring(1);
  income.textContent = formatter.format(incomeTotal);
  expense.textContent = formatter.format(expenseTotal * -1);
}
