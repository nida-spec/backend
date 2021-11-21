const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db')

var cors = require('cors')

//to access config.env
dotenv.config({ path: './config/config.env' })

connectDB();

const trasactions = require('./routes/transactions')

const app = express();

//body parser for adding task
app.use(express.json())
app.use(cors())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use('/api/v1/transactions', trasactions)



const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));