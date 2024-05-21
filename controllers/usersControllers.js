import usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";


export const register = async (req, res, next) => {
    try {
        const {email, subscription} = await usersService.registerUser(req, next);
        res.status(201).json({
            user: {email, subscription}
        });
    } catch (e) {
        next(e);
    }
};

export const login = async (req, res, next) => {
    try {
        const {token, email, subscription} = await usersService.loginUser(req, next);
        res.status(200).json({
            token,
            user: {email, subscription}
        });
    } catch (e) {
        next(e);
    }
};

export const logOut = async (req, res, next) => {
    try {
        await usersService.logOutUser(req)
        res.status(204).json({message: "No Content"});
    } catch (e) {
        next(e);
    }
};

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
