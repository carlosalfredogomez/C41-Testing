import mailer from 'nodemailer'
import envConfig from '../config/env.config.js'

class MailingService {
    constructor() {
        this.client = mailer.createTransport({
            service: envConfig.mailing.SERVICE,
            port: 587, 
            auth: {
                user: "codercagomez@gmail.com",
                pass: envConfig.mailing.PASSWORD
            }
        })
    }

    async sendSimpleMail({ from, to, subject, html, attachments: [] }) {
        let result = await this.client.sendMail({ from, to, subject, html, attachments })
        return result
    }


    
    resetPassword = async (email, resetLink) => {
        try {
            const mailOptions = {
                from: envConfig.mailing.USER,
                to: email,
                subject: 'Password Reset',
                html: `<p>You requested to reset your password. Click the following link to reset it:</p>
                <a href="${resetLink}">Click here to renew your Oath to the Rhino Realm</a>`,
            }

            let result = await this.client.sendMail(mailOptions);
            return result;

        } catch (error) {
            throw error
        }
    }
}


export default new MailingService()