/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
	Link,
	Stack,
	Checkbox,
	TextField,
	IconButton,
	InputAdornment,
	FormControlLabel,
	Zoom,
	Button,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import firebase from 'src/firebase';
import ForgotPasswordDialog from './ForgotPasswordDialog';
// ----------------------------------------------------------------------

export default function LoginForm() {
	const navigate = useNavigate();
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};
	const [showPassword, setShowPassword] = useState(false);

	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email('Email must be a valid email address')
			.required('Email is required'),
		password: Yup.string().required('Password is required'),
	});

	async function login(email, password) {
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password);

			navigate('/dashboard', { replace: true });

			// localStorage.getItem('auth');

			// .then((res) => {
			// 	return res && login();
			// });
		} catch (error) {
			alert(error.message);
		}
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			remember: true,
		},
		validationSchema: LoginSchema,
		onSubmit: (values, { setSubmitting }) => {
			const { email, password } = values;
			console.log(email);
			login(email, password);
			// setEmail(email);
			// setPassword(password);
			setTimeout(() => {
				setSubmitting(false);
			}, 500);
		},
		// onSubmit: () => {
		// 	navigate('/dashboard', { replace: true });
		// },
	});

	const {
		errors,
		touched,
		values,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		getFieldProps,
	} = formik;

	const handleShowPassword = () => {
		setShowPassword((show) => !show);
	};

	return (
		<FormikProvider value={formik}>
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
										onClick={handleShowPassword}
										edge="end"
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
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{ my: 2 }}
				>
					{/* <FormControlLabel
		control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
		label="Remember me"
	  /> */}

					<Link
						component={Button}
						variant="subtitle2"
						onClick={() => handleOpenDialog()}
					>
						Forgot password?
					</Link>
				</Stack>

				<LoadingButton
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					loading={isSubmitting}
				>
					Login
				</LoadingButton>
			</Form>
			<ForgotPasswordDialog
				openDialog={openDialog}
				onCloseDialog={handleCloseDialog}
			/>
		</FormikProvider>
	);
}
