const mongoose = require('mongoose');

async function Database(){
    await mongoose.connect(`mongodb+srv://AiProject:AiProject@cluster0.pj8f9ue.mongodb.net/golduser`)
    .then(()=>{
     console.log('Database connected')
    }).catch(err => console.log(err));
 }
 
 module.exports = Database;