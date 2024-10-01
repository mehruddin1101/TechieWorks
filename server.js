const express = require('express')
const adminRouter = require('./routes/adminRoute')
const jobRoute = require('./routes/jobRoute')
require('dotenv').config()
const cors = require('cors')
const connectDB  = require('./database/connect')
const { json } = require('express/lib/response')

const app = express()
app.use(cors())

// middle ware 
app.use(express.json())

// db 
connectDB()

// routes

app.use("/api",adminRouter)
app.use("/api",jobRoute)

const PORT = process.env.PORT  || 3000
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
}
)





