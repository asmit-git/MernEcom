/*............. ES6 Imports .....................*/
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';


/* ..................env Configuration...................... */
dotenv.config()

/* .................. Database config ...................... */
connectDB()
/*
if the .env is not on root folder the configuration will be
dotenv.config({path:''})
*/

/* ..................REST Object...................... */
const app = express()

/* .................. Middlewares ...................... */
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

/* .................. Routes ...................... */
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

/* ..................REST API...................... */
app.get('/', (req, res) => {
    res.send({
        message: "Welcome"
    })
})

/* ..................SERVER & PORT...................... */
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`.bgCyan.white)
})