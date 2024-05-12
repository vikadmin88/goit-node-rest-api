import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

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
    return contacts.find(contact => contact.id === contactId) ?? null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx < 0) return null;

    const removedItem = contacts.splice(idx, 1)[0];
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return removedItem;
    } catch (error) {
        return null;
    }
}

async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    const contact = {id: crypto.randomUUID(), name, email, phone};

    contacts.push(contact);
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return contact;
    } catch (error) {
        return null;
    }
}

async function updateContact(contactId, updData) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx < 0) return null;

    contacts[idx] = { ...contacts[idx], ...updData };
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return contacts[idx];
    } catch (error) {
        return null;
    }

}
export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
