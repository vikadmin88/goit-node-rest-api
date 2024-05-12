import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
    contactsService
        .listContacts()
        .then(contacts => res.status(200).json(contacts));
};

export const getOneContact = (req, res) => {
    contactsService
    .getContactById(req.params.id)
    .then(contact => {
        if (!contact) throw HttpError(404, "Not found");
        res.status(200).json(contact);
    })
    .catch(err => res.status(err.status).json({ message: err.message }));
};

export const deleteContact = (req, res) => {
    contactsService
        .removeContact(req.params.id)
        .then(contact => {
            if (!contact) throw HttpError(404, "Not found");
            res.status(200).json(contact);
        })
        .catch(err => res.status(err.status).json({ message: err.message }));
};

export const createContact = (req, res) => {
    contactsService
        .addContact(req.body)
        .then(contact => {
            if (!contact) throw HttpError(404, "Not found");
            res.status(201).json(contact);
        })
        .catch(err => res.status(err.status).json({ message: err.message }));
};

export const updateContact = (req, res) => {
    if (!Object.keys(req.body).length) {
        throw HttpError(400, "Body must have at least one field");
    }
    contactsService
        .updateContact(req.params.id, req.body)
        .then(contact => {
            if (!contact) throw HttpError(404, "Not found");
            res.status(200).json(contact);
        })
        .catch(err => res.status(err.status).json({ message: err.message }));
};
