const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const {mongoose} = require('./../db/db');
const {Category} = require('./../db/models/category');
const {Item} = require('./../db/models/item');
const {ObjectID} = require('mongodb');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));
app.use(bodyParser.json());


// Register new category/item
app.post('/newcategory', (req,res)=>{
    let { name } = req.body;
    if(!name) res.status(400).send();
    let category = new Category({name});
    category.save()
    .then(()=>{
        res.send(category);
    })
    .catch((e)=>res.status(400).send());
});

app.post('/newitem', (req,res)=>{
    let { name } = req.body;
    if(!name) res.status(400).send();
    let item = new Item({name});
    item.save()
    .then(()=>{
        res.send(item);
    })
    .catch((e)=>res.status(400).send());
});

//read categories
app.get('/categories', async (req,res) => {
    const categories = await Category.find({});
    res.send(categories);
});

//read items
app.get('/items', (req,res) => {
    Item.find({}).then((items)=>{
        if(!items.length) return res.status(400).send();
        res.send(items);
    });
});

//update category/item


//delete category/item
app.delete('/deletecategory/:id', (req,res)=>{
    let id = req.params.id;
    if(!id && !ObjectID.isValid(id)) return res.status(400).send();
    Category.findOneAndRemove(
        {
            _id: id
        }
    )
    .then((doc)=>{
        if(!doc) return res.status(400).send();
        res.send(doc);
    })
    .catch((e)=>{
        res.status(400).send();
    })
});

app.delete('/deleteitem/:id', (req,res)=>{
    let id = req.params.id;
    if(!id && !ObjectID.isValid(id)) return res.status(400).send();
    Item.findOneAndRemove(
        {
            _id: id
        }
    )
    .then((item)=>{
        if(!item) return res.status(400).send();
        res.send(item);
    })
    .catch((e)=>{
        res.status(400).send();
    })
});

server.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
});
