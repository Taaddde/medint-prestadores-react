import { useEffect, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { getCurrentMonthAndYear, getMonthAndYear, getPreviousMonthAndYear } from 'app/services/dateService/dateService';
import { getOrders, getUrl, setOrdersSearchText } from '../store/ordersSlice';
import { Button } from '@material-ui/core';
import { existeFactura } from 'app/services/fetchService/fetchService';
import AUTH_CONFIG from 'app/services/jwtService/jwtConfig';


function OrdersHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.orders.searchText);
	const mainTheme = useSelector(selectMainTheme);
	const data = useSelector(state => state.eCommerceApp.orders.entities);
	const { id: idPrestador } = useSelector(state => state.auth.user.data);
	const [idFactura, setIdFactura] = useState(null);
	
	const today = getCurrentMonthAndYear();
	const[date, setDate] = useState(today);

	const handleChange = async (e) => {
		setDate(e.target.value);
	}

	useEffect(async () => {
		const url = getUrl(date, idPrestador);
		dispatch(getOrders(url));

		const fecha = getMonthAndYear(date);
		const respuesta = await existeFactura(fecha[1], fecha[0], idPrestador);

		if(respuesta.factura){
			setIdFactura(respuesta.factura._id);
		} else {
			setIdFactura(null);
		}

		// if(Object.keys(data).length === 0){
		// 	const lastMonth = getPreviousMonthAndYear();
		// 	setDate(lastMonth);
		// 	url = getUrl(date, idPrestador);
		// 	dispatch(getOrders(url));
		// } 
	}, [date])

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<Icon
					component={motion.span}
					initial={{ scale: 0 }}
					animate={{ scale: 1, transition: { delay: 0.2 } }}
					className="text-24 md:text-32"
				>
					receipt
				</Icon>
				<Typography
					component={motion.span}
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
					delay={300}
					className="text-16 md:text-24 mx-12 font-semibold"		
				>
					Listado de pacientes
				</Typography>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<Paper
						component={motion.div}
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
					>
						<Icon color="action">search</Icon>

						<Input
							placeholder="Buscar"
							className="flex flex-1 mx-8"
							disableUnderline
							fullWidth
							value={searchText}
							inputProps={{
								'aria-label': 'Search'
							}}
							onChange={ev => dispatch(setOrdersSearchText(ev))}
						/>
					</Paper>
					
				</ThemeProvider>
				
				<Input
					type="month"
					name="date"
					style={{
					margin: '0 0 0 auto',
					color: 'black',
					filter: 'invert(100%)'
					}}
					value={date}
					onChange={handleChange}
				/>

				{ (idFactura) ?
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						target="_blank" 
						href={`${AUTH_CONFIG.domain}/factura/file/${idFactura}`}
					>
						Descargar Factura
					</Button>

					:

					<Button
						className="whitespace-nowrap mx-4"
						disabled
						variant="contained"
						color="secondary"
					>
						Factura no disponible
					</Button>

				}

	
				
			</div>
		</div>
	);
}

export default OrdersHeader;
