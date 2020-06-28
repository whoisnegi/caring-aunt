import nodeMailer from 'nodemailer';

const sendWelcomeEmail = async (email, name) => {
    const emailFormat = `<h1 style="text-align: center;color: RED;">Caring Aunt</h1><hr/><h3>Dear ${name},</h3>
    <b>From now onwards taking care of your Menstrual Cycle is our responsibility.</b>
    <b><br>Regards</b>,<br><b>Caring Aunt Team</b>`;
    try {
        const { USER_EMAIL, USER_EMAIL_PASSWORD } = process.env;
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: USER_EMAIL,
                pass: USER_EMAIL_PASSWORD
            }
        });
        transporter.sendMail({
            from: USER_EMAIL,
            to: email,
            subject: `Thanks for joining Caring-Aunt`,
            html: emailFormat
        });
    } catch (e) {
        console.log(e);
    }
};

const sendCancellationEmail = (email, name) => {
    const htmlFormat = `<h1 style="text-align: center;color: RED;">Caring Aunt</h1><hr/><h3>Goodbye ${name},</h3>
          <b>Hope to see you soon.</b><br><b>Please do let us know, How we can improve!</b><br>
          <b>You can send your feedback/suggestion at <b>yourcaringaunt@gmail.com</b> or simply reply to this email.
            </b> <br>
            <b>Regards</b>,<br>
            <b>Caring Aunt Team</b>`;
    try {
        const { USER_EMAIL, USER_EMAIL_PASSWORD } = process.env;
        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: USER_EMAIL,
                pass: USER_EMAIL_PASSWORD
            }
        });
        transporter.sendMail({
            from: USER_EMAIL,
            to: email,
            subject: 'Sorry to see you go!',
            html: htmlFormat
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };

