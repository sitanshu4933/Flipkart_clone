const express = require('express')
const env=require('dotenv')
const bodyParser=require('body-parser')
const mongoose = require('mongoose');

const app=express()

// enviorment variable setup
env.config()

// connect to Database
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kx9pm.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndexes:true
}).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
});

app.use(bodyParser.json())
// Route middlewares
app.use('/api',require('./routes/auth'))
app.use('/api',require('./routes/Admin/auth'))

app.listen(process.env.PORT,()=>{
    console.log(`Server running at port ${process.env.PORT}`)
})