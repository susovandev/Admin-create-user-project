import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	DATABASE_URI: process.env.DATABASE_URI,
	DATABASE_NAME: process.env.DATABASE_NAME,

	MAIL_SERVICE: process.env.MAIL_SERVICE,
	MAIL_HOST: process.env.MAIL_HOST,
	MAIL_PORT: process.env.MAIL_PORT,
	MAIL_USER: process.env.MAIL_USER,
	MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};

export const config = Object.freeze(_config);
