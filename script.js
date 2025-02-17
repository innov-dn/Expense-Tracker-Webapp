const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const balanceEl = document.getElementById("balance");
const darkModeSwitch = document.getElementById("dark-mode-switch");

if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeSwitch.checked = true;
}

darkModeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", isDarkMode ? "enabled" : "disabled");
});

let transactions = [];

function updateSummary() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  totalIncomeEl.textContent = `₹${income}`;
  totalExpenseEl.textContent = `₹${expense}`;
  balanceEl.textContent = `₹${balance}`;
}

function renderTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach((transaction, index) => {
    const li = document.createElement("li");
    li.classList.add(transaction.type);
    li.innerHTML = `
            <span>${transaction.date} - ${transaction.description} - ₹${transaction.amount}</span>
            <div class="transaction-actions">
                <button class="edit" onclick="editTransaction(${index})">Edit</button>
                <button class="delete" onclick="deleteTransaction(${index})">Delete</button>
            </div>
        `;
    transactionList.appendChild(li);
  });
}

function addTransaction(e) {
  e.preventDefault();
  const description = document.getElementById("description").value;
  const amount = +document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;

  transactions.push({ description, amount, date, type });
  transactionForm.reset();
  updateSummary();
  renderTransactions();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateSummary();
  renderTransactions();
}

function editTransaction(index) {
  const transaction = transactions[index];
  document.getElementById("description").value = transaction.description;
  document.getElementById("amount").value = transaction.amount;
  document.getElementById("date").value = transaction.date;
  document.getElementById("type").value = transaction.type;
  transactions.splice(index, 1);
  updateSummary();
  renderTransactions();
}

transactionForm.addEventListener("submit", addTransaction);
