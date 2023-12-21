import express from 'express'
import router from './router/index.js'
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT || 8080

const app = express()

const corsOptions = {
  origin: ['https://somos-modus.com', 'https://somosmodus.com'],
  credentials: true,
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Router
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
