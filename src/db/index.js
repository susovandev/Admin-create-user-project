import mongoose from 'mongoose';
import { config } from '../config/env.config.js';
export default async function connectDB() {
	try {
		const connectionInstance = await mongoose.connect(
			`${config.DATABASE_URI}/${config.DATABASE_NAME}`,
		);
		console.log(`DATABASE CONNECTED: ${connectionInstance.connection.host}`);
	} catch (error) {
		console.log(`DATABASE CONNECTION FAILED: ${error.message}`);
		throw error;
	}
}
