const express = require('express')
const app = express()
require('dotenv').config() 
const PORT =  process.env.PORT ||4700 
const mongoose = require('mongoose')
const mongodb_uri = process.env.URI
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors ())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const NigeriaFoods =[
    {
        id:1234, 
        location: 'Ibadan',
        price: 600, 
    },
    {
        id:2, 
        location:'Oyo', 
        price: 120,
    },
    {
        id: 3, 
        location: 'Osun',
        price: 3400
    }, 
    {
        id: 5, 
        location: 'Sokoto', 
        price: 2500
    }
]

let userSchema = mongoose.Schema({
    item: String, 
})

mongoose.connect(mongodb_uri)

.then(() =>{
    console.log('Database connected');  
})
.catch((err) =>{
    console.log(err);
})

let userModel = mongoose.model('users', userSchema)

app.get('/home', (req, res) =>{
    res.send(NigeriaFoods)
})

app.post('/submit', (req, res) =>{
    console.log(req.body);
    const form = new userModel(req.body) 
    form.save()
})

app.listen(PORT, ()=>{
    console.log(`Lift off! Server has started at ${PORT}`);  
})