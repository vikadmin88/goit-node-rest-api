import HttpError from "../helpers/HttpError.js";
import {Contact} from "../models/contact.js";

async function listContacts(req) {
    const contacts = await Contact.find({owner: req.user._id});
    return contacts ?? [];
}

async function getContactById(contactId) {
    const contact = await Contact.findById(contactId);
    if (contact) return contact;
    throw HttpError(404, "Not found");
}

async function removeContact(contactId) {
    const contact = await Contact.findByIdAndDelete(contactId);
    if (contact) return contact;
    throw HttpError(404, "Not found");
}

async function addContact(req) {
    const contact = await Contact.create({...req.body, owner: req.user._id});
    if (contact) return contact;
    throw HttpError(500, "Can't create contact");
}

async function updateContact(contactId, req) {
    if (!Object.keys(req.body).length) {
        throw HttpError(400, "Body must have at least one field");
    }

    const contact = await Contact.findByIdAndUpdate(contactId, req.body,{ new: true });
    if (contact) return contact;
    throw HttpError(404, "Not found");
}

async function updateStatusContact(contactId, { favorite }) {
    const contact = await Contact.findByIdAndUpdate(contactId, {favorite: favorite},{ new: true });
    if (contact) return contact;
    throw HttpError(404, "Not found");
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact
}
