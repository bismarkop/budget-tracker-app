const express = require("express");
const router = express.Router();
const Expense = require("../models/expenseModel.js")


router
  .route("/")
  .get(async (req, res) => {
    // res.json(expenses); // Keeping this here for future API/application practice
    res.render("index")
  })
  // .post(async (req, res) => {
  //   console.log(req.body)
  //   let newExpense = new Expense({
  //     name: req.body.name,
  //     category: req.body.category,
  //     amount: req.body.amount,
  //     date: req.body.date,
  //   })
  //   newExpense.save()
  //   res.send("Success")
  // })
  // .post(async (req, res) => {
  //   if (req.body.name && req.body.category && req.body.amount && req.body.date) {
  //     const expense = {
  //       id: expenses[expenses.length - 1].id + 1,
  //       name: req.body.name,
  //       category: req.body.category,
  //       amount: req.body.amount,
  //       date: req.body.date,
  //     };

  //     expenses.push(expense);
  //     res.json(expenses[expenses.length - 1]);
  //   } 
    
  //   else res.json({ error: "Insufficient Data" });
  // });

router.get("/transactions", async (req, res) => {
  res.render("transactions");
});


module.exports = router;
