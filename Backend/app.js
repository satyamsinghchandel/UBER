// dotenv used to secure port and other credentials
const dotenv = require('dotenv');
dotenv.config();
// used to show the data on the allowed domains
const cors = require('cors');
const express = require('express')
const app = express();

app.use(cors());




app.get('/', (req, res)=>{
    res.send("hello world");
})


module.exports = app;