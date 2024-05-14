import HttpError from "../helpers/HttpError.js";
import {Contact} from "../models/contact.js";

async function listContacts() {
    const contacts = await Contact.find({});
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

async function addContact(reqBody) {
    const contact = await Contact.create(reqBody);
    if (contact) return contact;
    throw HttpError(500, "Can't create contact");
}

async function updateContact(contactId, reqBody) {
    if (!Object.keys(reqBody).length) {
        throw HttpError(400, "Body must have at least one field");
    }

    const contact = await Contact.findByIdAndUpdate(contactId, reqBody,{ new: true });
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
