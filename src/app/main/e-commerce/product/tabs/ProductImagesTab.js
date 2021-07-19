import { Typography } from '@material-ui/core';
import { castFechayHora } from 'app/services/dateService/dateService';
import AUTH_CONFIG from 'app/services/jwtService/jwtConfig';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function ProductImagesTab(props) {
	const data = useSelector(({ eCommerceApp }) => eCommerceApp.product);

	if(data) castFechayHora(data.consentimientos);
	
	return (
		<div className="table-responsive">
			<table className="simple">
				<thead>
					<tr> 
						<th className="w-1/3">
							<Typography className="font-semibold">Fecha y Hora</Typography>
						</th>
						<th className="w-1/3">
							<Typography className="font-semibold">Mes</Typography>
						</th>
						<th className="w-1/3">
							<Typography className="font-semibold">Profesional</Typography>
						</th>
						<th className="w-1/3">
							<Typography className="font-semibold">Evolución</Typography>
						</th>
					</tr>
				</thead>
				<tbody>
					{data && data.consentimientos.map(consentimiento => (
							<tr key={consentimiento._id}>
								<td className="w-96">{consentimiento.fechadecarga}</td>
								<td className="w-96">{consentimiento.mesreferencia} </td>
								<td className="w-96">{consentimiento.profesional}</td>
								<td>
									<Typography
										component={Link}
										to={{ pathname: `https://medint.com.ar/adminzone/consentimientos/${consentimiento.archivo}` }}
										target="_blank"
										className="truncate"
										style={{
											color: 'inherit',
											textDecoration: 'underline'
										}}
									>
										Ver consentimiento
									</Typography>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default ProductImagesTab;
