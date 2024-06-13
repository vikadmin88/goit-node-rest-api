import authService from "../services/authServices.js";
import gravatar from 'gravatar';
import mailer from "../helpers/mailer.js";
import HttpError from "../helpers/HttpError.js";


export const register = async (req, res, next) => {
    try {
        req.body.avatarURL = gravatar.url(req.body.email, {s: '250', r: 'x', d: 'retro'}, true);
        const user = await authService.registerUser(req, next);
        if (user) {
            try {
                await mailer.sendVerificationEmail(user.email, user.verificationToken);
            } catch (err) {
                throw HttpError(500, err);
            }

            res.status(201).json({
                user: {email: user.email, subscription: user.subscription}
            });
        }

    } catch (e) {
        next(e);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await authService.loginUser(req, next);
        if (user) {
            res.status(200).json({
                token: user.token,
                user: {email: user.email, subscription: user.subscription}
            });
        }
    } catch (e) {
        next(e);
    }
};

export const logOut = async (req, res, next) => {
    try {
        await authService.logOutUser(req)
        res.status(204).json({message: "No Content"});
    } catch (e) {
        next(e);
    }
};
