const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 2,
            trim: true
        },
        items: [
            {
                _itemID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Item',
                    required: true
                },
                active: {
                    type: Boolean,
                    default: true
                }
            }
        ]
    }
);

let Category = mongoose.model('categories', CategorySchema);

module.exports = {Category};