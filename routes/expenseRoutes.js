const express = require("express");
const router = express.Router();

const Expense = require("../models/expenseModel.js");
const Income = require("../models/incomeModel.js");

router
  .route("/")
  .get(async (req, res) => {
    res.render("expenses");
  })
  // .post(async (req, res) => {
  //   try {
  //     let newExpense = new Expense({
  //       name: req.body.name,
  //       category: req.body.category,
  //       amount: req.body.amount,
  //       date: req.body.date,
  //     });

  //     await Expense.create(req.body);
  //     // res.send("Success")
  //     res.redirect("/");
  //   } catch (error) {
  //     console.error("Error saving data", error);
  //     re.status(500).send("Error saving data");
  //   }
  // });
// .post((req, res) => {
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

router
  .route("/tracker")
  .get(async (req, res, next) => {
    res.render("tracker");
  })
  .post(async (req, res) => {
    console.log(req.body);
    try {
      if (req.body.type == "on") {
        let newIncome = new Income({
          name: req.body.name,
          category: req.body.category,
          amount: req.body.amount,
          date: req.body.date,
        });

        await newIncome.save();
        console.log("Data was saved");
        res.redirect("/transactions/expenses/tracker");
      } 
      else {
        let newExpense = new Expense({
          name: req.body.name,
          category: req.body.category,
          amount: req.body.amount,
          date: req.body.date,
        });
        
        await newExpense.save();
        console.log("This data was saved.");
        res.redirect("/transactions/expenses/tracker");
      }
    } 
    catch (error) {
      console.error("Error saving data", error);
      res.status(500).send("Error saving data");
    }
  });

// router
//   .route("/:id")
//   .get(async (req, res, next) => {
//     const expense = expenses.find((e) => e.id == req.params.id);
//     if (expense) res.json(expense);
//     else next();
//   })
//   .patch(async (req, res, next) => {
//     const expense = expenses.find((inc, i) => {
//       if (inc.id == req.params.id) {
//         for (const key in req.body) {
//           expenses[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (expense) res.json(expense);
//     else next();
//   })
//   .delete(async (req, res, next) => {
//     const expense = expenses.find((e, i) => {
//       if (e.id == req.params.id) {
//         expenses.splice(i, 1);
//         return true;
//       }
//     });

//     if (expense) res.json(expense);
//     else next();
//   });

module.exports = router;
