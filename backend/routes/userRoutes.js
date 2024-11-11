const server = require('express')
const router = server.Router();
const {registerUser, loginUser, currentUser} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', validateToken, currentUser);


module.exports = router;