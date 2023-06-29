const express= require('express');
const cors = require('cors');
const morgan = require('morgan');
const Database = require('./db');
const users = require('./model/userSchema')
require('dotenv').config()

// rest object
const app=express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(morgan("dev"));
app.use(express.static("build"));

app.get('/api/users/public/v2/get', async (req, res) => {
    try {
        const{title,rating,q,page,limit}=req.query;
        const filters = {}

        if (title) filters.Title = new RegExp(title, 'i')
        if (q) filters.Title = new RegExp(q, 'i')
        if (rating) filters.Rating =  (rating)

        const data = await users.find(filters).limit(limit).skip((page-1)*limit);
      res.status(200).send(data)
    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})
app.get('*/',(req, res) =>{
    res.sendFile(__dirname + '/build/index.html')
})

// port listining
const port=4001;
Database();
app.listen(port,()=>{
    console.log(`listening on port  ${port}`);
});