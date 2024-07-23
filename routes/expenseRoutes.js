const express = require("express");
const router = express.Router();

const expenses = require("../data/expenses");

router
  .route("/")
  .get((req, res) => {
    res.json(expenses); // Keeping this here for future API/application practice
    // res.send("<h1>Expense Page</h1>"); // Come back here to create an Expense HTML page
  })
  .post((req, res) => {
    if (req.body.name && req.body.amount && req.body.date) {
      const expense = {
        id: expenses[expenses.length - 1].id + 1,
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
      };

      expenses.push(expense);
      res.json(expenses[expenses.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const expense = expenses.find((e) => e.id == req.params.id);
    if (expense) res.json(expense);
    else next();
  })
  .patch((req, res, next) => {
    const expense = expenses.find((inc, i) => {
      if (inc.id == req.params.id) {
        for (const key in req.body) {
          expenses[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (expense) res.json(expense);
    else next();
  })
  .delete((req, res, next) => {
    const expense = expenses.find((e, i) => {
      if (e.id == req.params.id) {
        expenses.splice(i, 1);
        return true;
      }
    });

    if (expense) res.json(expense);
    else next();
  });


module.exports = router;