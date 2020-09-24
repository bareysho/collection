const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Tag = new Schema({
    text: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }

});

Tag.virtual('tagId')
    .get(function () {
        return this.id;
    });

const TagModel = mongoose.model('Tag', Tag);

module.exports = TagModel;