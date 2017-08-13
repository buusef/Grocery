const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
            unique: true
        },
        _category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    }
);

let Item = mongoose.model('items', ItemSchema);

module.exports = {Item};