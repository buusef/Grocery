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
    let { name, addedToCat } = req.body;
    if(!name) res.status(400).send();
    let item = new Item({name, addedToCat});
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
app.patch('/category/:id', (req,res)=>{
    let id = req.params.id;
    let name = req.body.name;
    if(!ObjectID.isValid(id)) return res.status(400).send();

    Category.findOneAndUpdate(
        {
            _id: id
        },
        {
            $set: 
            {
                name
            }
        },
        {
            new: true
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

app.patch('/catItems/:catId', async (req,res)=>{
    try {
        let _id = req.params.catId;
        let {_itemId, active, action} = req.body;

        if(!ObjectID.isValid(_id) || !ObjectID.isValid(_itemId)) return res.status(400).send();
        
        switch(action) {
            case 'add':
                // await Category.update(
                //     {
                //         _id,
                //         'items._itemId': { '$ne': _itemId }
                //     },
                //     {
                //         $push: {
                //             items: {
                //                 _itemId
                //             }
                //         }
                //     }
                // );
                await Category.addNewItem(_id, _itemId);
                await Item.changeDetails(_itemId, undefined, true);
                res.send();
                break;
            case 'remove':
                await Category.update(
                    {
                        _id
                    },
                    {
                        $pull: {
                            items: {
                                _itemId
                            }
                        }
                    }
                );
                await Item.changeDetails(_itemId, undefined, false);
                res.send();
                break;
            case 'changeActivity':
                await Category.update(
                    {
                        _id: new ObjectID(_id),
                        'items._itemId': new ObjectID(_itemId)
                    },
                    {
                        $set: {
                            'items.$.active': active
                        }
                    }
                );
                res.send();
                break;
            default:
                res.status(400).send('default response');
                break;
        };
    } catch(e) {
        res.status(400).send('Something went wrong: ' + e);
    }
});

app.patch('/item/:id', (req,res)=>{
    let id = req.params.id;
    let { name, addedToCat } = req.body;

    if(!ObjectID.isValid(id)) return res.status(400).send('Either of three is wrong');
    
    Item.changeDetails(id, name, addedToCat)
    .then((doc)=>{
        if(!doc) return res.status(400).send('Apparently the id is not found');
        res.send(doc);
    })
    .catch((e)=>{
        res.status(400).send(e);
    })
});

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
