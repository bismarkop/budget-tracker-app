if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index")
const expenses = require("./routes/expenseRoutes")
const incomes = require("./routes/incomeRoutes")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use("/public", express.static("public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/", indexRouter)
app.use("/transactions/expenses", expenses)
app.use("/transactions/incomes", incomes)

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