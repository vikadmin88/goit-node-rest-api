import { Schema, model } from 'mongoose';

const contact = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
},{
    versionKey: false
});

export const Contact = model('contacts', contact);