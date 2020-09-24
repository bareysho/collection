const express = require('express');
const passport = require('passport');
const router = express.Router();

const log = require('../log')(module);
const Tag = require('../mongoose/models/Tag');


router.get('/', function (req, res) {

    const result = Tag.find({}, {
        id: 1,
        text: 1
    });

    result.then(data => res.json(data))
        .catch(err => res.status(400).send(err));
});


router.post('/', function (req, res) {
    console.log('text', req.body)
    const tag = new Tag({
        text: req.body.text,
        id : req.body.id
    });

    tag.save(function (err) {
        if (!err) {
            return res.json(tag);
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


module.exports = router;