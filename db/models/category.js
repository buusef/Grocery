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
                name: {
                    type: String,
                    required: true,
                    minlength: 2,
                    unique: true,
                    trim: true
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