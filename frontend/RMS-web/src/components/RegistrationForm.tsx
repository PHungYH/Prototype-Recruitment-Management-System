import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { HTTPHelper } from '../utils/HTTPHelper';
import appGlobal from '../utils/AppGlobal';
import { useNavigate } from 'react-router-dom';

type FormValues = {
	username: string;
	email: string;
	password: number;
	confirmPassword?: number;
};

interface RegisterResponse {
	token?: string,
	errorCode?: string;
	message?: string;
}

const style_input = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";
const style_input_label = "block text-sm font-medium text-gray-700";
const style_input_error = "text-red-500 text-sm mt-1";

const RegistrationForm: React.FC = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();

	const password = watch('password');

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		const username = data.username.trim();
		const email = data.email.trim();
		const password = data.password.toString().trim();
		try {
			const regResult = await HTTPHelper.call<RegisterResponse>(
				`${appGlobal.endpoint_auth}/registerApplicant`,
				'POST',
				{ username, email, password }
			);
			console.log(regResult);
			if (regResult.token) {
				localStorage.setItem(appGlobal.storage_key_token, regResult.token);
				localStorage.setItem(appGlobal.storage_key_userType, appGlobal.userType_APPLICANT);
				alert('Registration successful! Please provide us more information.');
				navigate(`/${appGlobal.userType_APPLICANT.toLowerCase()}/profile_management`);
			} else if (regResult.errorCode) {
				alert(`Registration failed: ${regResult?.message}`);
			}
		} catch (error) {
			console.log(error);
			alert('System error! Please try again.');
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* Username Field */}
				<div>
					<label className={style_input_label}>Username</label>
					<input
						{...register('username', {
							required: 'Username is required',

							pattern: {
								value: /^[a-zA-Z0-9]+$/,
								message: 'No special characters allowed',
							}
						})}
						className={style_input}
					/>
					{errors.username && <p className={style_input_error}>{errors.username.message}</p>}
				</div>

				{/* Email Field */}
				<div>
					<label className={style_input_label}>Email</label>
					<input
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'Invalid email address',
							},
						})}
						className={style_input}
					/>
					{errors.email && <p className={style_input_error}>{errors.email.message}</p>}
				</div>

				{/* Password Field */}
				<div>
					<label className={style_input_label}>Password</label>
					<input
						type="password"
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 8,
								message: 'Password must be at least 8 characters',
							},
							maxLength: {
								value: 20,
								message: 'Password must not exceed 20 characters',
							}
						})}
						className={style_input}
					/>
					{errors.password && <p className={style_input_error}>{errors.password.message}</p>}
				</div>

				{/* Confirm Password Field */}
				<div>
					<label className={style_input_label}>Confirm Password</label>
					<input
						type="password"
						{...register('confirmPassword', {
							required: 'Please confirm your password',
							validate: (value) =>
								value === password || 'Passwords do not match',
						})}
						className={style_input}
					/>
					{errors.confirmPassword && (
						<p className={style_input_error}>{errors.confirmPassword.message}</p>
					)}
				</div>


				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default RegistrationForm;
