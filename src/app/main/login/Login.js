import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';

import instance from 'app/services/jwtService/jwtService';
import { loginError } from 'app/auth/store/loginSlice';
import store from 'app/store';
import userSlice, { setUser } from 'app/auth/store/userSlice';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
	root: {}
}));

const backgroundStyle = {
	backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
	backgroundImage: 'url(assets/images/backgrounds/background1.jpg)',
	height: '100%'
}

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	email: yup.string().email('Ingresa un email válido').required('Ingresa un email'),
	password: yup
		.string()
		.required('Ingresar contraseña.')
});

const defaultValues = {
	email: '',
	password: '',
	remember: true
};

function Login2Page() {
	const classes = useStyles();

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	async function onSubmit(data) {

		const resp = await instance.signInWithEmailAndPassword(data.email, data.password);
		
		const {token} = resp.data;
		const {_id, nombre, email, id_obra_social: idObraSocial} = resp.data.prestador;

		if(token){
			
			localStorage.setItem('token', token);
		
			store.dispatch(setUser({
				_id,
				nombre,
				email,
				idObraSocial
			}));
		
		// reset(defaultValues);
		};

		
	};



	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto p-16 sm:p-24 md:flex-row md:p-0 overflow-hidden')}>
			<div className="flex flex-col flex-grow-0 items-center p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left" style={backgroundStyle} >
				<motion.div
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
				>
					<img className="w-128 mb-32" src="assets/images/logos/Medint.gif" alt="logo" />
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}>
					<Typography className="text-32 sm:text-44 font-semibold leading-tight">
						¡Bienvenido al sistema <br />
						de prestadores de <br /> MEDINT!
					</Typography>
				</motion.div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
					<Typography variant="subtitle1" className="mt-32 font-medium">
						Aplicación completa para los prestadores afiliados con MEDINT.
					</Typography>
				</motion.div>
			</div>

			<Card
				component={motion.div}
				initial={{ x: 200 }}
				animate={{ x: 0 }}
				transition={{ bounceDamping: 0 }}
				className="w-full max-w-400 mx-auto m-16 md:m-0 rounded-20 md:rounded-none"
				square
				layout
			>
				<CardContent className="flex flex-col items-center justify-center p-16 sm:p-32 md:p-48 md:pt-128 ">
					<Typography variant="h6" className="mb-24 font-semibold text-18 sm:text-24">
						Ingresa a tu cuenta
					</Typography>

					<form
						name="loginForm"
						noValidate
						className="flex flex-col justify-center w-full"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-16"
									label="Email"
									autoFocus
									type="email"
									error={!!errors.email}
									helperText={errors?.email?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>

						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-16"
									label="Contraseña"
									type="password"
									error={!!errors.password}
									helperText={errors?.password?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>

						<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
							<Controller
								name="remember"
								control={control}
								render={({ field }) => (
									<FormControl>
										<FormControlLabel label="Recordar" control={<Checkbox {...field} />} />
									</FormControl>
								)}
							/>

							<Link className="font-normal" to="/pages/auth/forgot-password-2">
								¿Olvidaste la contraseña?
							</Link>
						</div>

						<Button
							variant="contained"
							color="primary"
							className="w-full mx-auto mt-16"
							aria-label="Ingresar"
							disabled={_.isEmpty(dirtyFields) || !isValid}
							type="submit"
						>
							Ingresar
						</Button>
					</form>

				</CardContent>
			</Card>
		</div>
	);
}

export default Login2Page;
