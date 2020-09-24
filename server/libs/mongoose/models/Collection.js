const mongoose = require('mongoose');
//const Item = require('./Item');

const Schema = mongoose.Schema;

const Item = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    tags: [Object],
    fields: {
        type: Array,
        required: false
    },
    modified: {
        type: Date,
        required: true,
        default: Date.now
    },
    img: {
        type: String,
        required: false
    },
    topic: {
        type: String,
        required: true
    }

});

Item.virtual('itemId')
    .get(function () {
        return this.id;
    });

const Collection = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    items: [Item],
    fields: {
        type: Array,
        required: false
    },
    topic: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    }
});

/*
Collection.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});
*/
Collection.virtual('collectionId')
    .get(function () {
        return this.id;
    });

const CollectionModel = mongoose.model('Collection', Collection);

module.exports = CollectionModel;