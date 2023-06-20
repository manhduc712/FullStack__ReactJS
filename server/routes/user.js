const router = require('express').Router();
const ctrls = require('../controllers/user');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', ctrls.register )
router.post('/login', ctrls.login )
router.get('/profile', verifyToken, ctrls.profile )
router.post('/edit', verifyToken, ctrls.edit )

module.exports = router;