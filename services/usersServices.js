import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import {User} from "../models/user.js";

const {PRIVATE_KEY, SALT_ROUNDS = 10, JWT_EXPIRES_IN = "24h"} = process.env;

async function registerUser(req) {
    const user = await User.findOne({email: req.body.email});
    if (user) throw HttpError(409, "Email in use");

    const passwordHash = await bcrypt.hash(req.body.password, Number(SALT_ROUNDS));
    return await User.create({...req.body, password: passwordHash});
}

async function loginUser(req) {
    const user = await User.findOne({email: req.body.email});
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        throw HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({id: user._id}, PRIVATE_KEY, {expiresIn: JWT_EXPIRES_IN});
    return User.findByIdAndUpdate(user._id, {token}, {new: true});
}

async function logOutUser(req) {
    const user = await User.findByIdAndUpdate(req.user.id, {token: null}, {new: true});
    if (user) return user;
    throw HttpError(401, "Not authorized");
}

export default {
    registerUser,
    loginUser,
    logOutUser,
}
