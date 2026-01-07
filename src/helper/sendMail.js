import transporter from '../config/mail.config.js';
import { config } from '../config/env.config.js';

export async function sendEmailService(emailData) {
	try {
		const { sender, recipient, subject, htmlTemplate } = emailData;
		await transporter.sendMail({
			from: sender || config.MAIL_USER,
			to: recipient,
			subject: subject,
			html: htmlTemplate,
		});
		console.log('Email sent successfully');
	} catch (error) {
		throw error;
	}
}
