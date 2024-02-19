const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const sendEmailVerification = async (userEmail, token) => {
    console.log('initializing email send process');

    const oauth2Client = new google.auth.OAuth2(
        process.env.OAUTH_CLIENTID,
        process.env.OAUTH_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );
    console.log('Client initialized');

    oauth2Client.setCredentials({
        refresh_token:process.env.OAUTH_REFRESH_TOKEN
    });
    
    const getAccessToken = async () => {
        try {
            const accessTokenResponse = await oauth2Client.getACcessToken();
            const accessToken = accessTokenResponse.token;
            console.log('Token retrieved: ',accessToken);
            return accessToken;
        } catch (error) {
            console.error('Error retrieving your access token. ',error)
        }
    };

    const retrievedAccessToken = getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type:'OAuth2',
            user: process.env.EMAIL_USERNAME,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: retrievedAccessToken
        },
    });

    const verificationUrl = `http://localhost:3000/verify-email/${token}`;
    console.log('Sending email via service to ',userEmail,' with token ',token);

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: 'Innkeeper Email Verification',
        html: `<p>Time to verify! Please follow this link to verify your account: <link>${verificationUrl}</link></p>`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to: ',userEmail);
    } catch (error) {
        console.error('Error sending verification email: ',error);
    }
};

module.exports = { sendEmailVerification };