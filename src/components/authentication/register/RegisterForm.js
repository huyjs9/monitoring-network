/* eslint-disable no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider, Formik } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import {
	Stack,
	TextField,
	IconButton,
	InputAdornment,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import firebase from 'src/firebase';

// ----------------------------------------------------------------------

export default function RegisterForm() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [emailtest, setEmailtest] = useState('');
	const [passwordtest, setPasswordtest] = useState('');
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (passwordtest) {
			onRegister();
		}
		setChecked(true);
	}, [emailtest, onRegister, passwordtest]);

	// async function onRegister(email, password) {
	// 	try {
	// 		await firebase
	// 			.auth()
	// 			.createUserWithEmailAndPassword(email, password);
	// 		alert('Register success! Sign in now!');
	// 		navigate('/login', { replace: true });
	// 	} catch (error) {
	// 		alert(error.message);
	// 	}
	// }

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				confirmPassword: '',
			}}
			validationSchema={Yup.object().shape({
				email: Yup.string()
					.email('Email is invalid.')
					.required('Email is required.'),
				password: Yup.string()
					.min(6, 'Password must be at least 6 characters.')
					.required('Password is required.'),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref('password'), null], 'Passwords must match.')
					.required('Confirm Password is required.'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				const { email, password } = values;
				setEmailtest(email);
				setPasswordtest(password);
				setTimeout(() => {
					// alert("Register success! Sign in now!", values);
					setSubmitting(false);
				}, 500);
			}}
		>
			{({
				values,
				touched,
				errors,
				isSubmitting,
				handleChange,
				handleBlur,
				handleSubmit,
				getFieldProps,
			}) => (
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Stack spacing={3}>
						<TextField
							fullWidth
							autoComplete="username"
							type="email"
							value={values.email}
							onBlur={handleBlur}
							onChange={handleChange}
							label="Email address"
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
						/>

						<TextField
							fullWidth
							autoComplete="current-password"
							type={showPassword ? 'text' : 'password'}
							value={values.password}
							onBlur={handleBlur}
							onChange={handleChange}
							label="Password"
							{...getFieldProps('password')}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											edge="end"
											onClick={() =>
												setShowPassword((prev) => !prev)
											}
										>
											<Icon
												icon={
													showPassword
														? eyeFill
														: eyeOffFill
												}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
						/>

						<TextField
							fullWidth
							autoComplete="confirm-password"
							type={showConfirmPassword ? 'text' : 'password'}
							value={values.confirmPassword}
							onBlur={handleBlur}
							onChange={handleChange}
							label="Confirm Password"
							{...getFieldProps('confirmPassword')}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											edge="end"
											onClick={() =>
												setShowConfirmPassword(
													(prev) => !prev
												)
											}
										>
											<Icon
												icon={
													showConfirmPassword
														? eyeFill
														: eyeOffFill
												}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
							error={Boolean(
								touched.confirmPassword &&
									errors.confirmPassword
							)}
							helperText={
								touched.confirmPassword &&
								errors.confirmPassword
							}
						/>

						<LoadingButton
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={isSubmitting}
						>
							Register
						</LoadingButton>
					</Stack>
				</Form>
			)}
		</Formik>
	);
	async function onRegister() {
		try {
			await firebase
				.auth()
				.createUserWithEmailAndPassword(emailtest, passwordtest);
			alert('Register success!');
			navigate('/dashboard', { replace: true });
		} catch (error) {
			alert(error.message);
		}
	}
}
