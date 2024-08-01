const express = require("express");
const router = express.Router();

const Expense = require("../models/expenseModel.js");




router
  .route("/")
  .get(async (req, res) => {
    res.render("expenses");
    // try {
    //   const expenses = await Expense.find({});
    //   res.status(200).json(expenses)
    // } 
    // catch (error) {
    //   res.status(500).json({message: error.message})
    // }
  })

 
router
  .route("/:id")
  .get(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (expense) res.json(expense);
    else next();
  })
  .patch(async (req, res) => {
    const expense = Expense.find((inc, i) => {
      if (inc.id == req.params.id) {
        for (const key in req.body) {
          expense[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (expense) res.json(expense);
    else next();
  })
  .delete(async (req, res) => {
    const expense = expenses.find((e, i) => {
      if (e.id == req.params.id) {
        expenses.splice(i, 1);
        return true;
      }
    });

    if (expense) res.json(expense);
    else next();
  });

router.param("id", (req, res, next, id) => {
  console.log(id)
  next()
})


module.exports = router;