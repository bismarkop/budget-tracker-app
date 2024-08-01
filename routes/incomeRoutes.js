const express = require("express");
const router = express.Router();
const Income = require("../models/incomeModel.js");

router
  .route("/")
  .get(async (req, res) => {
    res.render("incomes");
    // try {
    //   const incomes = await Income.find({});
    //   res.status(200).render(incomes)
    // } catch (error) {
    //   res.status(500).json({message: error.message})
    // }
  })


router
  .route("/:id")
  .get(async (req, res, next) => {
    const income = await Income.findById(req.params.id);
    if (income) res.json(income);
    else next();
  })

router
  .route('/:id/edit')
  .get(async (req, res) => {
    res.render('income/edit');
  })
  .patch(async (req, res) => {
    try {
      let updatedData = {
        name: req.body.name,
        category: req.body.category,
        amount: req.body.amount,
        date: req.body.date,
        // Include other fields as necessary
      };

      let income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedData));
      
      if (income) {
        console.log("Data was saved");
        res.json(income);
      } else {
        res.status(404).send("Income not found");
      }
    } 
    
    catch (error) {
      console.error("Error saving data", error);
      res.status(500).send("Error saving data");
    }
  });
  

  
// router
//   .route("/:id/edit")
//   .get(async (req, res) => {
//     res.render("income/edit")
//   })
//   .put(async (req, res) => {
//     console.log(req.body)

//     try {
//     const income = await Income.findOneAndUpdate((inc, i) => {
//       if (inc.id == req.params.id) {
//         for (const key in req.body) {
//           Income[i][key] = req.body[key];
//         }
//         income.save()
//         console.log("Data was saved")
//         res.send("Done!")
//       }
//     });

//     if (income) res.json(income);
//     else next();
//     }
//     catch {
//       console.error("Error saving data", error);
//       res.status(500).send("Error saving data");
//     }
//   })
  
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