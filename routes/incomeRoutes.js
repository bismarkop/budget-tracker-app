const express = require("express");
const router = express.Router();
const Income = require("../models/incomeModel.js");

router
  .route("/")
  .get(async (req, res) => {
    try {
      let incomeData = await Income.find({}).limit(10).sort({"date": 1})
      res.render("incomes", {
        incomeList: incomeData
      });
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })


router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const income = await Income.findById(req.params.id);

      if (!income) {
        res.status(404).json({message: "User not found."})
      }
      else {
        res.status(200).json(income);
      }
    } 
    catch (error) {
      res.status(500).json({message: error})
    }
  })

router
  .route("incomes/:id/delete")
  .get(async (req, res) => {
    res.send("Document deleted.")
  })
  // I need help figuring out how to get this to work. It's not updating the database
  .delete(async (req, res) => {
    try {
      const deleteIncome = await Income.findByIdAndDelete(req.params.id);

    if (!deleteIncome) {
      res.status(404).json({message: "ID not found."})
    };
      
    res.status(200).send("Successfully remove entry")
    res.redirect("/incomes")
    } 
    catch (error) {
      console.log("Error: ", error)
      res.status(500).send({message: "An error occured"})
    }
  });
  

router
  .route('/:id/edit')
  .get(async (req, res) => {
    let getId = Income.findById(req.params.id)
    console.log(req.params.id)
    res.render('income/edit', {update: getId });
  })
  // I need help figuring out how to get this to work. It's not updating the database
  .put(async (req, res, next) => {
    try {
      let incomeUpdate = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      if (!incomeUpdate) {
        res.status(404).send("Income not found");
      } 
      
      else {
        // await incomeUpdate.save()
        res.render("incomes")
        console.log("Data was saved");
        // next()
      }
    } 
    catch (error) {
      console.error("Error saving data", error);
      res.status(500).send("Error saving data");
    }
  });


  
module.exports = router;