const nodemailer = require('nodemailer');

const sendEmailVerification = async (userEmail, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type:'OAuth2',
            user: process.env.EMAIL_USERNAME,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: process.env.OAUTH_ACCESS_TOKEN
        },
    });

    const verificationUrl = `its working! ${token}`;
    console.log('Sending email via service to ',userEmail,' with token ',token);

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