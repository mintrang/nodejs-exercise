import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './src/routes/bootcamps'
import morgan from 'morgan'
import connectDB from './src/config/db'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Connect to database
connectDB()

// Routes
app.get('/', (req, res) => {
  res.send('test')
})

app.use('/api/v1/bootcamps', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server is running at port ${PORT}`))