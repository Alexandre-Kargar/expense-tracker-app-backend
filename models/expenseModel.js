const { default: mongoose } = require("mongoose")

const ExpenseSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            require: true,
            trim: true,
            maxLength: 50
        },

        amount : {
            type : Number,
            require: true,
            trim: true,
            maxLength: 20
        },

        type : {
            type : String,
            default: "expense"
        },

        date : {
            type : Date,
            require: true,
            trim: true,
        },

        category : {
            type : String,
            require: true,
            trim: true,
        },

        description : {
            type : String,
            require: true,
            trim: true,
            maxLength: 20
        },
    },

        {timestemps: true})

        module.exports = mongoose.model('Expense', ExpenseSchema)