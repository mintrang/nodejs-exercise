import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bootcamps from './src/routes/bootcamps'
import users from './src/routes/users'
import morgan from 'morgan'
import connectDB from './src/config/db'
import errorHandler from './src/middleware/error'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// Connect to database
connectDB()

// Routes
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/users', users)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server is running at port ${PORT}`))