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


app.patch('/public/v2/users/update', async (req, res) => {
    try {
        const { _id } = req.body;
        const data = await users.findByIdAndUpdate({ _id },{$set: { name: update.name,email: update.email}});
        res.status(200).send(data)
    } catch(err) {
        console.error(err.message);
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})


// port listining
const port=3002;
Database();
app.listen(port,()=>{
    console.log(`listening on port  ${port}`);
});