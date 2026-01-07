import nodemailer from 'nodemailer';
import { config } from '../config/env.config.js';

const transporter = nodemailer.createTransport({
	service: config.MAIL_SERVICE,
	host: config.MAIL_HOST,
	port: config.MAIL_PORT,
	auth: {
		user: config.MAIL_USER,
		pass: config.MAIL_PASSWORD,
	},
});

export default transporter;
