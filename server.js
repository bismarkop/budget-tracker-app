const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const expressLayouts = require("express-ejs-layouts")

// Routes
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

// Database Connection
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Connected to Mongoose"))

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

app.use("/", indexRouter)
app.use("/expenses", expenseRouter)
app.use("/incomes", incomeRouter)


app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Keeping for future use to seed data.

// const seedExpenses = [
//   {
//       id: "1",
//       name: "groceries",
//       category: "food",
//       amount: "200",
//       date: "7/1/2024",
//   },
//   {
//       id: "2",
//       name: "movies",
//       category: "entertainment",
//       amount: "40",
//       date: "7/5/2024",
//   },
//   {
//       id: "3",
//       name: "seamless",
//       category: "takeout",
//       amount: "50",
//       date: "7/6/2024",
//   }
// ]

// const seedIncomes = [
//   {
//       id: "1",
//       name: "Pay Day",
//       category: "Weekly Income",
//       amount: "3000",
//       date: "7/5/2024",
//   },
//   {
//       id: "2",
//       name: "Massage Client",
//       category: "client",
//       amount: "160",
//       date: "7/3/2024",
//   },
//   {
//       id: "3",
//       name: "Pay Day",
//       category: "Weekly Income",
//       amount: "3000",
//       date: "7/12/2024",
//   }
// ]



app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`)
})
