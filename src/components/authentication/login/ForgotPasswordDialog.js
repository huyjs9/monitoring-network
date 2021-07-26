import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	Slide,
	Alert,
} from '@material-ui/core';
import firebase from 'src/firebase';

function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}

export default function ForgotPasswordDialog(props) {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState([]);
	const { openDialog, onCloseDialog } = props;

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSendEmail = (value) => {
		if (email) {
			ResetPassword(value);
		}
	};

	const ForgotPasswordSchema = Yup.object().shape({
		email: Yup.string().email('Email must be a valid email address'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: ForgotPasswordSchema,
		onSubmit: (values, { setSubmitting }) => {
			const { email } = values;
			setEmail(email);
			setTimeout(() => {
				setSubmitting(false);
			}, 500);
		},
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

	return (
		<div>
			<Dialog
				open={openDialog}
				onClose={onCloseDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					Forgot Password?
				</DialogTitle>
				<FormikProvider value={formik}>
					<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
						<DialogContent>
							<DialogContentText>
								Please enter your email address here. We will
								send the link to reset password!
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								label="Email Address"
								type="email"
								value={values.email}
								onBlur={handleBlur}
								onChange={handleChange}
								fullWidth
								{...getFieldProps('email')}
								error={Boolean(touched.email && errors.email)}
								helperText={touched.email && errors.email}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={onCloseDialog} color="primary">
								Cancel
							</Button>
							<Button
								type="submit"
								onClick={() => {
									onCloseDialog();
									handleClick();
									handleSendEmail(email);
								}}
								color="primary"
								disabled={isSubmitting}
							>
								Send
							</Button>
						</DialogActions>
					</Form>
				</FormikProvider>
			</Dialog>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				autoHideDuration={3000}
				open={open}
				onClose={handleClose}
				TransitionComponent={SlideTransition}
			>
				{email ? (
					<Alert onClose={handleClose} severity="success">
						Password reset email sent successfully!
					</Alert>
				) : (
					<Alert onClose={handleClose} severity="error">
						You have not entered your email!
					</Alert>
				)}
			</Snackbar>
		</div>
	);
	async function ResetPassword(email) {
		try {
			await firebase.auth().sendPasswordResetEmail(email);
		} catch (err) {
			console.log(err.message);
		}
	}
}
