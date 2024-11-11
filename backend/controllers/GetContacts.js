const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
// @desc Get all contact
// @route GET /api/contacts
// @access Private
const getAllContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

// @desc create new contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const newContact = await Contact.create({name, email, phone,user_id: req.user.id}).catch(e => {
        res.status(401);
        throw new Error(e.message);
    });
    res.status(201).json(newContact);
});

// @desc update contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async(req, res) => {
    var contact = await Contact.findById(req.params.id);
    try{
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User dont have permission to update other contacts');
    }
    var updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, {new: true, upsert: true, runValidators: true}
    )
    if(!updatedContact){
        res.status(404);
        throw new Error('Update contact failed');
    }
    res.status(200).json(updatedContact);
} catch (e){
    console.log(e.message);
}
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async(req, res) => {
    var contact = await Contact.findById(req.params.id);
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User dont have permission to update other contacts');
    }
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async(req, res) => {
    var contact = await Contact.findById(req.params.id);
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User dont have permission to update other contacts');
    }
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    await contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    getContact,
    deleteContact
};
