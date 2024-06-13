import nodemailer from "nodemailer";
const { BASE_URL, MAILER_HOST, MAILER_USER, MAILER_PASS } = process.env;

const transporter = nodemailer.createTransport({
    host: MAILER_HOST,
    // port: 587,
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: MAILER_USER,
        pass: MAILER_PASS,
    },
});

async function sendMail(emailData) {
    return await transporter.sendMail(emailData);
}

async function sendVerificationEmail(email, verificationToken) {
    return await transporter.sendMail( {
        from: "verification@epowhost.com",
        to: email,
        subject: "Please verify your email",
        text: `Please click to this link to confirm your email: ${BASE_URL}/api/users/verify/${verificationToken}`,
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Please click here to confirm your email</a>`
    });
}

export default {
    sendMail,
    sendVerificationEmail
}