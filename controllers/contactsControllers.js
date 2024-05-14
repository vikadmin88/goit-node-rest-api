import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    res.status(200).json(
        await contactsService.listContacts()
    );
};

export const getOneContact = async (req, res, next) => {
    try {
        res.status(200).json(
            await contactsService.getContactById(req.params.id)
        );
    } catch (e) {
        next(e);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        res.status(200).json(
            await contactsService.removeContact(req.params.id)
        );
    } catch (e) {
        next(e);
    }
};

export const createContact = async (req, res, next) => {
    try {
        res.status(201).json(
            await contactsService.addContact(req.body)
        );
    } catch (e) {
        next(e);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        res.status(200).json(
            await contactsService.updateContact(req.params.id, req.body)
        );
    } catch (e) {
        next(e);
    }
};

export const updateStatusContact = async (req, res, next) => {
    try {
        res.status(200).json(
            await contactsService.updateStatusContact(req.params.id, req.body)
        );
    } catch (e) {
        next(e);
    }
};
