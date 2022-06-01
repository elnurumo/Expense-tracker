const balance = document.querySelector("#balance");

const money_plus = document.querySelector("#money-plus");

const money_minus = document.querySelector("#money-minus");

const list = document.querySelector("#list");

const form = document.querySelector("#form");

const text = document.querySelector("#text");

const amount = document.querySelector("#amount");

let count = [];

//! Form submit

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (text.value.trim() == "" || amount.value.trim() == "") {
        alert("Please add some value...")
        return;
    }

    //! Object

    const transaction = {
        text: text.value,
        amount: +amount.value,
    }

    count.push(transaction);
    exp();
    createTransaction(transaction);

    text.value = "";
    amount.value = "";
})

// < li class="plus" >
//     Salary < span > +2500</span > <button class="delete-btn">x</button>
//         </li >

//! Minus, Plus - AMOUNT

function createTransaction(transaction) {
    let sign = "-";
    let symbol = "";

    // if (transaction.text == "Cash") {
    //     sign = "-"
    //     symbol = "minus"
    // } else if (transaction.text == "Salary") {
    //     sign = "+"
    //     symbol = "plus"
    // }

    if (transaction.amount < 0) {
        sign = "-"
        symbol = "minus"
        transaction.amount = -1 * transaction.amount;
    } else if (transaction.amount >= 0) {
        sign = "+"
        symbol = "plus"
    }


    const li = document.createElement("li")
    li.classList.add(symbol)

    const span = document.createElement("span")
    span.innerText = `${sign + '$'}${transaction.amount}`
    if (symbol == "minus") {
        transaction.amount = -1 * transaction.amount;
    }

    const delete_btn = document.createElement("button");
    delete_btn.innerText = "x"
    delete_btn.classList.add("delete-btn")

    delete_btn.addEventListener("click", () => {
        delete_btn.parentElement.remove()
    })

    li.append(transaction.text, span, delete_btn)

    list.prepend(li)
}

function exp() {
    let income = 0;
    let expense = 0;

    for (let e of count) {
        if (e.amount >= 0) {
            income = income + e.amount;
        }

        if (e.amount < 0) {
            e.amount = -1 * e.amount
            expense = expense + e.amount;
            e.amount = -1 * e.amount
        }
    }

    money_plus.innerText = `+${'$'}${income}`;
    money_minus.innerText = `-${'$'}${expense}`;

    balance.innerText = `${'$'}` + (income - expense);
}

//! Clear List- Beginner

renderList();

function renderList() {
    list.innerHTML = "";
}

