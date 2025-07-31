const express = require('express')
const router = express.Router();
const authMiddileware = require("../middilewares/auth.middileware")
const mapController = require('../controllers/map.controller')
const { query } = require ('express-validator')


router.get('/get-coordinates', 
    [query('address').isString().isLength({min:3})],authMiddileware.authUser, mapController.getCoordinates);
    
router.get('/get-distance-time', query('origin').isString().isLength({min:3}), query('destination').isString().isLength({min:3}), authMiddileware.authUser, mapController.getDistanceTime ),


router.get('/get-suggestions',
    [query('input').isString().isLength({min:3})], authMiddileware.authUser, mapController.getAutoCompleteSuggestions);

module.exports = router;
