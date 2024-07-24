import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    date: {
        type: String
    }
})