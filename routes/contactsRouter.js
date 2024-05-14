import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as controller from "../controllers/contactsControllers.js";
import {createSchema, updateSchema, updateFavoriteSchema} from "../schemas/contactsSchemas.js";
import {validateId} from "../helpers/validateId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controller.getAllContacts);

contactsRouter.get("/:id", validateId, controller.getOneContact);

contactsRouter.delete("/:id", validateId, controller.deleteContact);

contactsRouter.post("/", validateBody(createSchema), controller.createContact);

contactsRouter.put("/:id", validateId, validateBody(updateSchema), controller.updateContact);

contactsRouter.patch('/:id/favorite', validateId, validateBody(updateFavoriteSchema), controller.updateStatusContact);

export default contactsRouter;
