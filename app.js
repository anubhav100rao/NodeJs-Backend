const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const cors = require('cors')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

// middleware to access data of req.body

app.use(express.static('./public'))
app.use(express.json())

app.use(cors({origin: 'http://localhost:3000'}));




app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('DATABASE CONNECTED...')
        
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}/...`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()