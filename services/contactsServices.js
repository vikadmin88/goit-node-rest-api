import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import HttpError from "../helpers/HttpError.js";

const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    } catch (error) {
        return [];
    }
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const retContact = contacts.find(contact => contact.id === contactId);
    if (!retContact) {
        throw HttpError(404, "Not found");
    }
    return retContact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx < 0) {
        throw HttpError(404, "Not found");
    }

    const removedItem = contacts.splice(idx, 1)[0];
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return removedItem;
    } catch (err) {
        throw HttpError(500, err.message);
    }
}

async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    const contact = {id: crypto.randomUUID(), name, email, phone};

    contacts.push(contact);
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return contact;
    } catch (err) {
        throw HttpError(500, err.message);
    }
}

async function updateContact(contactId, updData) {
    if (!Object.keys(updData).length) {
        throw HttpError(400, "Body must have at least one field");
    }

    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx < 0) {
        throw HttpError(404, "Not found");
    }

    contacts[idx] = { ...contacts[idx], ...updData };
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return contacts[idx];
    } catch (err) {
        throw HttpError(500, err.message);
    }

}
export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
