const ExpenseSchema = require("../models/expenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        // Validations
        if (!title || !category || !description || !date){
            return res.status(400).json({messsage: 'Tous les champs doivent être remplis'})
        }
        if (amount <= 0 || !amount === 'number'){
            return res.status(400).json({messsage: 'La valeur ajoutée doit être positive'})
        }
        await expense.save()
        res.status(200).json({message: 'Dépense ajoutée'})
    } catch (error) {
        res.status(500).json({message: 'Problème de serveur'})

    }
    console.log(expense)
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({CreatedAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Problème de serveur'})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: 'Dépense supprimée'})
        })
        .catch ((error) => {
            res.status(500).json({message: 'Problème de serveur'})

        })
}
