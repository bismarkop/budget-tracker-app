const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const expressLayouts = require("express-ejs-layouts")

const indexRouter = require("./routes/index")
const expenseRouter = require("./routes/expenseRoutes")
const incomeRouter = require("./routes/incomeRoutes")

app.set("view engine", "ejs")
app.set("layout", "layoutView")
app.set("views", __dirname + "/views")

app.use(expressLayouts)
app.use("/public", express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter)
app.use("/transactions/expenses", expenseRouter)
app.use("/transactions/incomes", incomeRouter)

// Database Connection
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Connected to Mongoose"))


// const exampleSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   }
// })
// const collection = new mongoose.model("expenses", exampleSchema)

// data = {
//   name: "Bizzy"
// }

// collection.insertMany(data)

app.use((req, res, next) => {
  const time = new Date();

  console.log(`-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}`);

  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});


app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`)
})
