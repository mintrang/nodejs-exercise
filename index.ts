import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './src/routes/bootcamps'

dotenv.config()

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('test')
})

app.use('/api/v1/bootcamps', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server is running at port ${PORT}`))