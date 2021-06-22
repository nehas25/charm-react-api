// imports
const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/', ctrl.dresses.index);
router.get('/:id', ctrl.dresses.show);

// exports
module.exports = router;
