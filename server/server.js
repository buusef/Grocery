const express = require('express');
const {mongoose} = require('./../db/db');
const {Category} = require('./../db/models/category');

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req,res)=>{
    res.send('Hello World');
});

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})