import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ['admin', 'user'], default: 'user' },
		bio: { type: String },
	},
	{ timestamps: true },
);

userSchema.index({ role: 1 });

export default mongoose.model('User', userSchema);
