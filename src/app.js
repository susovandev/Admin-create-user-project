import express from 'express';
import path from 'node:path';
import session from 'express-session';
import flash from 'connect-flash';

import adminRoutes from './routes/admin.routes.js';
import userRoutes from './routes/user.routes.js';

export default function initializeApp() {
	const app = express();

	// middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Ejs setup
	app.set('view engine', 'ejs');

	// view engine setup
	app.set('views', path.join(process.cwd(), 'views'));

	// static files
	app.use(express.static(path.join(process.cwd(), 'public')));

	app.use(
		session({
			secret: 'your-secret',
			resave: false,
			saveUninitialized: false,
		}),
	);

	app.use(flash());

	// Make flash available in all views
	app.use((req, res, next) => {
		res.locals.success = req.flash('success');
		res.locals.error = req.flash('error');
		next();
	});

	// routes
	app.use('/user', userRoutes);
	app.use('/admin', adminRoutes);
	return app;
}
