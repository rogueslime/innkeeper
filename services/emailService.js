const nodemailer = require('nodemailer');

const sendEmailVerification = async (userEmail, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const verificationUrl = `its working! ${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: 'Innkeeper Email Verification',
        html: `Time to verify! ${verificationUrl}`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to: ',userEmail);
    } catch (error) {
        console.error('Error sending verification email: ',error);
    }
};

module.exports = { sendEmailVerification };