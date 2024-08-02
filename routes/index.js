const express = require("express");
const router = express.Router();
const Expense = require("../models/expenseModel.js")
const Income = require("../models/incomeModel.js");

router
  .route("/")
  .get(async (req, res) => {
    // res.json(expenses); // Keeping this here for future API/application practice
    res.render("index")
  })


router.get("/transactions", async (req, res) => {
  res.render("transactions");
});

router
  .route("/tracker")
  .get(async (req, res) => {
    res.render("tracker");
  })
  .post(async (req, res) => {
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
        res.redirect("/tracker");
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
        res.redirect("/tracker");
      }
    } 
    catch (error) {
      console.error("Error saving data", error);
      res.status(500).send("Error saving data");
    }
  });


module.exports = router;
