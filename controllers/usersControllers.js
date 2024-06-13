import usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import jimp from 'jimp';
import mailer from "../helpers/mailer.js";

export const getCurrent = async (req, res, next) => {
    if (req.user) {
        res.status(200).json({
            email: req.user.email,
            subscription: req.user.subscription,
        });
    } else {
        next(HttpError(401, "Not authorized"));
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const {email, subscription} = await usersService.updateSubscription(req);
        res.status(200).json({
            email,
            subscription
        });
    } catch (e) {
        next(e);
    }
};

export const updateAvatar = async (req, res, next) => {
    try {
        if (!req.file) throw next(HttpError(400, "File not found"))

        const {_id} = req.user;
        const {path: tempUpload, filename} = req.file;

        const file = await jimp.read(tempUpload);
        await file.resize(250, 250).writeAsync(tempUpload);

        const newAvaName = `${_id}_${filename}`;
        const newAvaPath = path.resolve("public", "avatars", newAvaName);

        await fs.rename(tempUpload, newAvaPath);
        const avatarURL = path.join('/avatars', newAvaName);

        await usersService.updateAvatar(_id, {avatarURL}, next);
        res.json({avatarURL: avatarURL});
    } catch (e) {
        next(e);
    }
};

export const verificationEmail = async (req, res, next) => {
    try {
        const user = await usersService.verificationEmail(req, next);
        if (user) {
            res.status(200).json({
                message: "Verification successful",
            });
        } else {
            throw HttpError(404, "User not found")
        }
    } catch (e) {
        next(e);
    }
};

export const resendVerificationEmail = async (req, res, next) => {
    try {
        const user = await usersService.resendVerificationEmail(req, next);

        if (!user) throw HttpError(404, "User not found");
        if (user.verify) throw HttpError(400, "Verification has already been passed");

        try {
            await mailer.sendVerificationEmail(user.email, user.verificationToken);
            res.status(200).json({"message": "Verification email sent"});
        } catch (err) {
            throw HttpError(500, err);
        }

    } catch (e) {
        next(e);
    }
};
