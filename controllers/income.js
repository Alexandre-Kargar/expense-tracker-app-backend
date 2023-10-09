const IncomeSchema = require("../models/incomeModel")


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const income = IncomeSchema({
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
        if (!amount === 'number' || amount <= 0){
            return res.status(400).json({messsage: 'La valeur ajoutée doit être positive'})
        }
        await income.save()
        res.status(200).json({message: 'Revenu ajouté'})
    } catch (error) {
        res.status(500).json({message: 'Problème de serveur'})

    }
    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({CreatedAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Problème de serveur'})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Revenu supprimé'})
        })
        .catch ((error) => {
            res.status(500).json({message: 'Problème de serveur'})

        })
}
