const Transaction = require('../models/Transactions')

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.addTransactions = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (error) {
        if(error.name === 'ValidationError'){
            const messages = Object.values(error.errors).map(val => val.message)

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
    
}

exports.deleteTransactions = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)

        if(!transaction){
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }

        await transaction.remove()

        return res.status(200).json({
            success: true,
            data: {}
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.updateTransactions = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
        .then(exercise => {
            exercise.name = req.body.name;
            exercise.description = req.body.description;
            exercise.activity = req.body.activity;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);
      
            exercise.save()
              .then(() => res.json('Exercise updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })


        if(transaction){
            return res.status(404).json({
                success: true,
                error: 'Updated'
            })
        }

        

        return res.status(200).json({
            success: true,
            data: {}
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.findTransactions = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)

        if(!transaction){
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }

       

        return res.status(200).json({
            success: true,
            count: transaction.length,
            data: transaction
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}
