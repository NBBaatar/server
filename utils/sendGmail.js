const nodemailer = require("nodemailer");
const gal = require("google-auth-library");
const auth = new gal.GoogleAuth();
const jwtClient = new gal.JWT();
const CLIENT_ID =
  "289187525336-gc7rpml6fp9psgmhhocqfevht028cr3b.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04RhP5kH4f0FdCgYIARAAGAQSNwF-L9Ir_3wfhcklBefFVUB7TY1s5voGQ3mkOwpmVFbiwGEjqhrfUWg-8X0tvPy6D7HUwCyEbNk";
const oAuth2Client = new gal.OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const sendEmail = async (options) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "appsupport@level33.com.au",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const result = await transport.sendMail({
      to: options.email,
      from: `${process.env.MAIL_FROM} <${process.env.MAIL_FROM_EMAIL}>`,
      subject: options.subject,
      html: options.message,
    });
    return result;
  } catch (error) {
    return error;
  }
};
module.exports = sendEmail;
