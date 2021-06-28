// imports
const router = require('express').Router();
const ctrl = require('../controllers');

// routes
router.get('/resetdb', ctrl.setup.resetdb);

// exports
module.exports = router;
