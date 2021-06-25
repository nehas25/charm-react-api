const router = require('express').Router();
const ctrl = require('../controllers');

router.post('/user/:userid/add', ctrl.bagItems.addBagItems);
router.post('/user/:userid/remove', ctrl.bagItems.removeBagItems);
// router.post('/items', ctrl.bagItems.addMultipleItems);

module.exports = router;