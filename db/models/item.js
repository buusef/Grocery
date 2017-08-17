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
        addedToCat: Boolean
    }
);

ItemSchema.statics.changeDetails = function (id, name, addedToCat) {
    let item = this;
    let body = {};
    if(name) body.name = name;
    if(typeof addedToCat === 'boolean') body.addedToCat = addedToCat;

    return item.findOneAndUpdate(
        {
            _id: id
        },
        {
            $set: body
        },
        {
            new: true
        }
    );
};

let Item = mongoose.model('items', ItemSchema);

module.exports = {Item};