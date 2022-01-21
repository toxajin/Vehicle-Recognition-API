const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require('cors');
const handleRegister = require("./controlers/register.js");
const {handleSignin} = require("./controlers/signin.js");
const {handleProfileGet} = require("./controlers/profile.js");
const {handleApiCall, handleImage} = require("./controlers/image.js");
const {db} = require("./controlers/db.js");
const app = express();
app.use(express.json());
app.use(cors())
app.get('/', (req,res) => {res.json(database.users)})
app.get('/profile/:id', (req, res) => {handleProfileGet(req,res,db)})
app.put('/image', (req, res) => {handleImage(req,res,db)})
app.post('/imageurl', (req, res) => {handleApiCall(req,res)})
app.post('/signin',handleSignin(db,bcrypt))
app.post('/register',(req, res) => {handleRegister(req,res,db,bcrypt)})
app.listen(process.env.PORT || 3000,()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})