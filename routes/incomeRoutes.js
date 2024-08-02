const express = require("express");
const router = express.Router();
const Income = require("../models/incomeModel.js");

router
  .route("/")
  .get(async (req, res) => {
    let incomeData = await Income.find({}).limit(5)
      res.render("incomes", {
        incomeList: incomeData
      });
     
    

    // try {
    //   const incomes = await Income.find({});
    //   res.status(200).render(incomes)
    // } catch (error) {
    //   res.status(500).json({message: error.message})
    // }
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
  .route('/:id/edit')
  .get(async (req, res) => {
    res.render('income/edit');
  })
  .put(async (req, res) => {
    try {
      let incomeUpdate = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      if (!incomeUpdate) {
        res.status(404).send("Income not found");
      } 
      
      else {
        await incomeUpdate.save()
        console.log("Data was saved");
      }
    } 
    
    catch (error) {
      console.error("Error saving data", error);
      res.status(500).send("Error saving data");
    }
  });
  

  // .delete(async (req, res, next) => {
  //   const income = incomes.find((e, i) => {
  //     if (e.id == req.params.id) {
  //       incomes.splice(i, 1);
  //       return true;
  //     }
  //   });

  //   if (income) res.json(income);
  //   else next()
  // });
  
module.exports = router;