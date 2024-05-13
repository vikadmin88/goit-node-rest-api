import contactsService from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
    contactsService
        .listContacts()
        .then(contacts => res.status(200).json(contacts));
};

export const getOneContact = async (req, res) => {
    try {
        res.status(200).json(
            await contactsService.getContactById(req.params.id)
        );
    } catch (err) {
        res.status(err.status).json({ message: err.message })
    }
};

export const deleteContact = async (req, res) => {
    try {
        res.status(200).json(
            await contactsService.removeContact(req.params.id)
        );
    } catch (err) {
        res.status(err.status).json({ message: err.message })
    }
};

export const createContact = async (req, res) => {
    try {
        res.status(201).json(
            await contactsService.addContact(req.body)
        );
    } catch (err) {
        res.status(err.status).json({ message: err.message })
    }
};

export const updateContact = async (req, res) => {
    try {
        res.status(200).json(
            await contactsService.updateContact(req.params.id, req.body)
        );
    } catch (err) {
        res.status(err.status).json({ message: err.message })
    }
};
