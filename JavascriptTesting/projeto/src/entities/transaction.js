class Transaction {
    constructor({ customer, car, amount, dueDate }) {
        this.customer = customer;
        this.dueDate = dueDate;
        this.amount = amount;
        this.car = car;
    }
}

module.exports = Transaction;