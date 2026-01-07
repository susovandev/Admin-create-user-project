import initializeApp from './src/app.js';
import { config } from './src/config/env.config.js';
import connectDB from './src/db/index.js';

export default function main() {
	const app = initializeApp();
	const port = config.PORT;
	const NODE_ENV = config.NODE_ENV;

	connectDB()
		.then(() => {
			app.listen(port, () => {
				console.log(
					`Server listening on http://127.0.0.1:${port} in ${NODE_ENV} mode`,
				);
			});
		})
		.catch((error) => {
			console.log(`DATABASE CONNECTION FAILED: ${error.message}`);
			process.exit(1);
		});
}

main();
