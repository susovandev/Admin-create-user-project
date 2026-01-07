import userModel from '../models/user.model.js';
import { hashPassword } from '../helper/password.js';
import { sendEmailService } from '../helper/sendMail.js';
import greetingMailTemplate from '../mail-templates/greeting.js';

class AdminController {
	async getCreateUserPage(req, res) {
		res.render('admin/create', { old: {} });
	}

	async getAllUsers(req, res) {
		try {
			const users = await userModel.find({ role: 'user' }).lean();
			// console.log(users);
			if (!users.length) {
				req.flash('error', 'User not found');
			}

			res.render('admin/list', { users });
		} catch (error) {
			req.flash('error', 'Failed to fetch users');
			res.render('admin/list', { users: [] });
		}
	}

	async create(req, res) {
		console.log(`req.body: ${JSON.stringify(req.body)}`);
		try {
			const { username, email, password } = req.body;

			if (!email || !password) {
				req.flash('error', 'Email and password are required');
				return res.render('admin/create', { old: req.body });
			}

			const user = await userModel.findOne({ email });
			if (user) {
				req.flash('error', 'Email already exists');
				return res.redirect('/admin/create');
			}

			const hashedPassword = await hashPassword(password);
			if (!hashedPassword) {
				req.flash('error', 'Failed to create user');
				return res.redirect('/admin/create');
			}

			const newUser = await userModel.create({
				username,
				email,
				password: hashedPassword,
				role: 'user',
			});
			if (!newUser) {
				req.flash('error', 'Failed to create user');
				return res.redirect('/admin/create');
			}

			req.flash('success', 'Admin user created successfully');

			// Send email to the user with login details and link
			const loginUrl = 'http://localhost:5000/user/login';
			const loginDetails = `Email: ${email}\nPassword: ${password}`;

			await sendEmailService({
				recipient: email,
				subject: 'Login Details',
				htmlTemplate: greetingMailTemplate({
					username,
					email,
					password,
					loginUrl,
				}),
			});
			console.log('Email sent successfully');
			res.redirect('/admin/list');
		} catch (error) {
			req.flash('error', 'Email already exists');
			res.render('admin/create', { old: req.body });
		}
	}
}

export default new AdminController();
