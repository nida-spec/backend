const express = require('express')
const router = express.Router()
const { getTransactions, addTransactions, deleteTransactions, updateTransactions, findTransactions } = require('../controllers/transactions')

router
    .route('/')
    .get(getTransactions)
    .post(addTransactions)

router
    .route('/:id')
    .delete(deleteTransactions)
    .put(updateTransactions)
    .get(findTransactions)

module.exports = router