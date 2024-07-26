const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    // res.json(incomes); // Keeping this here for future API/application practice
    res.render("incomes")
  })

// router
//   .route("/:id")
//   .get(async (req, res, next) => {
//     const income = incomes.find((i) => i.id == req.params.id);
//     if (income) res.json(income);
//     else next();
//   })
//   .patch(async (req, res, next) => {
//     const income = incomes.find((inc, i) => {
//       if (inc.id == req.params.id) {
//         for (const key in req.body) {
//           incomes[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (income) res.json(income);
//     else next();
//   })
//   .delete(async (req, res, next) => {
//     const income = incomes.find((e, i) => {
//       if (e.id == req.params.id) {
//         incomes.splice(i, 1);
//         return true;
//       }
//     });

//     if (income) res.json(income);
//     else next()
//   });
  
module.exports = router;