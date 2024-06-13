import {User} from "../models/user.js";


async function updateSubscription(req, next) {
    try {
        return User.findByIdAndUpdate(req.user._id, {subscription: req.body.subscription}, {new: true});
    } catch (e) {
        next(e);
    }
}

async function updateAvatar(_id, avatarURL, next) {
    try {
        return User.findByIdAndUpdate(_id, avatarURL, {new: true});
    } catch (e) {
        next(e);
    }
}

async function verificationEmail(req, next) {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({verificationToken});
        if (user) {
            return User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null },{new: true});
        }
    } catch (e) {
        next(e);
    }
}

async function resendVerificationEmail(req, next) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        return user || null;
    } catch (error) {
        next(error)
    }
}

export default {
    updateSubscription,
    updateAvatar,
    verificationEmail,
    resendVerificationEmail,
}
