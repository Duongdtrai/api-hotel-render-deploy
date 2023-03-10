import * as nodeMailer from 'nodemailer';
import { CONFIG } from '../configs/configs';

const sendMail = async (to:string, subject:string, htmlContent:string) => {
    try {
        const transport = await nodeMailer.createTransport({
            host: CONFIG.mail.HOST,
            port: Number(CONFIG.mail.PORT),
            secure: false,
            auth: {
                user: CONFIG.mail.USERNAME,
                pass: CONFIG.mail.PASSWORD,
            },
        });

        const options = {
            from: CONFIG.mail.FROM_ADDRESS,
            to,
            subject,
            html: htmlContent,
        };
        return transport.sendMail(options);
    } catch (error) {
        console.log(error);
    }
};
export default sendMail;
