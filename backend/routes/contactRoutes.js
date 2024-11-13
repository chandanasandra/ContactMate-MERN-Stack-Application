// All the routes are defined in this file
var server = require('express');
const router = server.Router();
const {
    getAllContacts,
    createContact,
    updateContact,
    getContact,
    deleteContact } = require('../controllers/GetContacts');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getAllContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;