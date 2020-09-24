const express = require('express');
const router = express.Router();

const log = require('../log')(module);
const Collection = require('../mongoose/models/Collection');
const Item = require('../mongoose/models/Item');

router.get('/', function (req, res) {

    const result = Collection.find({}, {
        title: 1,
        description: 1,
        topic: 1,
        cover: '',
        fields: 1,
        author: 1,
        authorId: 1,
        items: [],
    });

    result.then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});



router.get('/:id', function (req, res) {
    //console.log("id ", req.params)
    Collection.findOne({ _id: req.params.id }, {
        title: 1,
        description: 1,
        topic: 1,
        cover: '',
        fields: 1,
        author: 1,
        authorId: 1,
        items: [],

    })
        .then(data => { res.json(data) })
        .catch(err => res.status(400).send(err));
});



router.get('/author/:authorId', function (req, res) {
    Collection.find({ authorId: req.params.authorId }, {
        title: 1,
        description: 1,
        topic: 1,
        cover: '',
        id: 1,
        author: '',
        authorId: ''
    })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.put('/:id', function (req, res) {
    Collection.updateOne({ _id: req.body._id }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            topic: req.body.topic,
            cover: req.body.cover,
            fields: req.body.fields
        }
    },
        { useFindAndModify: false })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.post('/collection', function (req, res) {
    const collection = new Collection({
        title: req.body.title,
        author: req.body.author,
        authorId: req.body.authorId,
        description: req.body.description,
        items: req.body.items,
        fields: req.body.fields,
        topic: req.body.topic,
        cover: req.body.cover
    });

    collection.save(function (err) {
        if (!err) {
            log.info(`User ${collection.author} created collection with id: ${collection.collectionId}`);
            return res.json(collection);
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error(`Internal error(${res.statusCode}): ${err.message}`);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
});

router.delete('/:id', function (req, res) {
    log.info(`Delete collection with id: ${req.body.data}`);
    Collection.findOne({ _id: req.body.data })
        .deleteOne()
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.post('/collection/:id/item', function (req, res) {
    //console.log('new item req', req.body)
    const item = new Item({
        title: req.body.title,
        author: req.body.author,
        authorId: req.body.authorId,
        img: req.body.img,
        fields: req.body.fields,
        topic: req.body.topic,
        tags: req.body.tags,
        img: req.body.img
    });

    //console.log('new item', item)
    Collection.findByIdAndUpdate(req.body._idCollection, {
        $push: {
            "items": item
        }
    }, { useFindAndModify: false })
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));

});

router.put('/collection/:id/delete/:itemId', function (req, res) {
    log.info(`Delete item with id: ${req.body.idItem} from collection with id ${req.body._idCollection}`);
    Collection.updateOne({ _id: req.body._idCollection }, {
        $pull: { items: { _id: req.body.idItem } }
    },
        { safe: true },
    )
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});

router.put('/collection/:id/update/:itemId', function (req, res) {   
    Collection.updateOne({ _id: req.params.id, 'items._id' : req.params.itemId }, {
        $set: { 
            "items.$.title": req.body.title,
            "items.$.tags": req.body.tags,
            "items.$.img": req.body.img,
            "items.$.fields": req.body.fields
        }
    })
        .then(data => {
            log.info(`Update item with id: ${req.params.idItem} from collection with id ${req.params.id}`);
            res.json(data)
        })
        .catch(err => res.status(400).send(err));
});

router.get('/:idCollection/:idItem', function (req, res) {
    //console.log("id ", req.params)
    Collection.findOne({ _id: req.params.idCollection}, {
        items: []
    })
        .then(data => {
            const result = data.items.filter(i => i._id == req.params.idItem);
            //console.log("result", result)
            res.json(result[0])
               /* title: 1,
                topic: 1,
                img: '',
                fields: [],
                tags: []
            
                .then(data2 => {
                    console.log("data2", data2);
                    res.json(data2);
                })
                ;*/
        })
        .catch(err => res.status(400).send(err));
});
module.exports = router;


