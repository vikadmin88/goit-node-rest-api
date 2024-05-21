import {Contact} from "../models/contact.js";

async function listContacts(req, next) {
    const userId = req.user._id;
    const fvrArrParams = req.query.favorite ? [req.query.favorite] : [true, false];
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    try {
        const contacts = await Contact.find({owner: userId, favorite: {$in: fvrArrParams}},
            null, {skip, limit});
        return contacts || [];
    } catch (e) {
        next(e);
    }
}

async function getContactById(contactId, next) {
    try {
        return await Contact.findById(contactId);
    } catch (e) {
        next(e)
    }
}

async function removeContact(contactId, next) {
    try {
        return await Contact.findByIdAndDelete(contactId);
    } catch (e) {
        next(e);
    }
}

async function addContact(req, next) {
    try {
        return await Contact.create({...req.body, owner: req.user._id});

    } catch (e) {
        next(e);
    }
}

async function updateContact(contactId, req, next) {
    try {
        return await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    } catch (e) {
        next(e);
    }
}

async function updateStatusContact(req, next) {
    try {
        return await Contact.findByIdAndUpdate({_id: req.params.id},
            {favorite: req.body.favorite}, {new: true});
    } catch (e) {
        next(e);
    }
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
}
