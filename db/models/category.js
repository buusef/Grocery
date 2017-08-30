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
                _itemId: {
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

// var autoPopulateLead = function(next) {
//     this.populate('lead');
//     next();
//   };
  
//   bandSchema.
//     pre('findOne', autoPopulateLead).
//     pre('find', autoPopulateLead);

CategorySchema.statics.addNewItem = function(_id, _itemId) {
    return this.update(
        {
            _id,
            'items._itemId': { '$ne': _itemId }
        },
        {
            $push: {
                items: {
                    _itemId
                }
            }
        }
    );
};

CategorySchema.statics.removeItem = function(_id, _itemId) {
    return this.update(
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
};

CategorySchema.statics.changeActivity = function(_id, _itemId, active) {
    return this.update(
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
};

let Category = mongoose.model('categories', CategorySchema);

module.exports = {Category};