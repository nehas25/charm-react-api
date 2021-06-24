const router = require('express').Router();
const ctrl = require('../controllers');

router.post('/', ctrl.accounts.create);
router.post('/login', ctrl.accounts.login);
router.get('/verify', ctrl.accounts.verify);

module.exports = router;