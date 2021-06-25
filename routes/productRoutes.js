// imports
const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/fetchdetails', ctrl.products.getProductsByIds);
router.get('/:id', ctrl.products.show);

// exports
module.exports = router;
