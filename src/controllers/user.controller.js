import userModel from '../models/user.model.js';
import { comparePassword, hashPassword } from '../helper/password.js';
class UserController {
	async getProfilePage(req, res) {
		if (!req.session.user) {
			return res.redirect('/user/login');
		}
		res.render('user/profile', { user: req.session.user });
	}

	async getLoginPage(req, res) {
		res.render('user/login');
	}

	async loginHandler(req, res) {
		try {
			console.log(req.body);
			const { email, password } = req.body;

			const user = await userModel.findOne({ email });
			if (!user) {
				req.flash('error', 'User not found');
				return res.redirect('/user/login');
			}

			const isPasswordMatch = await comparePassword(password, user.password);
			if (!isPasswordMatch) {
				req.flash('error', 'Invalid password');
				return res.redirect('/user/login');
			}

			req.session.user = user;
			res.redirect('/user/profile');
		} catch (error) {
			res.redirect('/user/login');
		}
	}

	async logoutHandler(req, res) {
		req.session.user = null;
		res.redirect('/user/login');
	}

	async getUpdateProfilePage(req, res) {
		res.render('user/update-password');
	}

	async updatePasswordHandler(req, res) {
		console.log(req.body);

		try {
			if (!req.session.user) {
				req.flash('error', 'Session expired. Please login again.');
				return res.redirect('/user/login');
			}

			const { currentPassword, newPassword, confirmPassword } = req.body;

			if (!currentPassword || !newPassword || !confirmPassword) {
				req.flash('error', 'All fields are required');
				return res.redirect('/user/update-password');
			}

			if (newPassword !== confirmPassword) {
				req.flash('error', 'New password and confirm password do not match');
				return res.redirect('/user/update-password');
			}

			const user = await userModel.findById(req.session.user._id);
			if (!user) {
				req.flash('error', 'User not found');
				return res.redirect('/user/update-password');
			}

			const isPasswordMatch = await comparePassword(
				currentPassword,
				user.password,
			);

			if (!isPasswordMatch) {
				req.flash('error', 'Invalid current password');
				return res.redirect('/user/update-password');
			}

			user.password = await hashPassword(newPassword);
			await user.save();

			req.flash('success', 'Password updated successfully');
			return res.redirect('/user/profile');
		} catch (error) {
			console.error(error);
			req.flash('error', 'Something went wrong');
			return res.redirect('/user/update-password');
		}
	}
}
export default new UserController();
