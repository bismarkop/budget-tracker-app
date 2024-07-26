const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
});

const Income = mongoose.model("Expense", incomeSchema)
module.exports = Income

