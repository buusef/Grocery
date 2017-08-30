const {ObjectID} = require('mongodb');
const {Category} = require('./../db/models/category');
const {Item} = require('./../db/models/item');

let itemId1 = new ObjectID();
let itemId2 = new ObjectID();

let itemList = [
    {
        _id: itemId1,
        name: 'Bnana',
        addedToCat: false
    },
    {
        _id: itemId2,
        name: 'Milk',
        addedToCat: true
    }
];

let categoryList = [
    {
        _id: new ObjectID(),
        name: 'Veg',
        items: [
            itemList[1]
        ]
    }
];

const populateItems = async (done) => {
    await Item.remove({});
    await Item.insertMany(itemList);
    done();
};

const populateCategory = async (done) => {
    await Category.remove({});
    await Category.insertMany(categoryList);
};

module.exports = {itemList, categoryList, populateItems, populateCategory};