const router = require('express').Router();
const ctrls = require('../controllers/user');

router.post('/register', ctrls.register )
router.post('/login', ctrls.login )
router.get('/profile', ctrls.profile )

module.exports = router;