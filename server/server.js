const express = require('express');
const {mongoose} = require('./../db/db');
const {Category} = require('./../db/models/category');

const app = express();

app.get('/', (req,res)=>{
    res.send('Hello World');
});

app.listen(3000, ()=>{
    console.log('Server is listening on 3000')
})