import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getDocumentos } from 'app/services/fetchService/fetchService';
import AUTH_CONFIG from 'app/services/jwtService/jwtConfig';
import GoogleMap from 'google-map-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OrdersStatus from '../OrdersStatus';

function Marker(props) {
	return (
		<Tooltip title={props.text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}

function OrderDetailsTab() {
	const idCarpeta = useSelector(({ eCommerceApp }) => eCommerceApp.order.sesiones[0].carpeta._id);
	const [documentos, setDocumentos] = useState([]);

	useEffect(async () => {
		
		const data = await getDocumentos(idCarpeta);

		setDocumentos(data);

	}, [])

	return (
		<div className="table-responsive">
			<table className="simple">
				<thead>
					<tr> 
						<th className="w-1/3">
							<Typography className="font-semibold">Desde</Typography>
						</th>
						<th className="w-1/3">
							<Typography className="font-semibold">Hasta</Typography>
						</th>
						<th className="w-1/3">
							<Typography className="font-semibold">Nombre</Typography>
						</th>
						<th className="w-1/3">
							<Typography className="font-semibold">Documento</Typography>
						</th>
					</tr>
				</thead>
				<tbody>
					{documentos && documentos.map(documento => (
							<tr key={documento._id}>
								<td className="w-96">{documento.desde}</td>
								<td className="w-96">{documento.hasta} </td>
								<td className="w-96">{documento.nombre}</td>
								<td>
									<Typography
										component={Link}
										to={{ pathname: `${AUTH_CONFIG.domain}/archivo/file?nombre=${documento.nombre}&carpeta=${documento.carpeta}` }}
										target="_blank"
										className="truncate"
										style={{
											color: 'inherit',
											textDecoration: 'underline'
										}}
									>
										Ver documento
									</Typography>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	); 
}

export default OrderDetailsTab;
