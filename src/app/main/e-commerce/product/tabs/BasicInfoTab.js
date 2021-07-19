import { Typography } from '@material-ui/core';
import { castFechayHora } from 'app/services/dateService/dateService';
import AUTH_CONFIG from 'app/services/jwtService/jwtConfig';
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BasicInfoTab(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	const data = useSelector(({ eCommerceApp }) => eCommerceApp.product);

	if(data) castFechayHora(data.evoluciones);
	
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
					{data && data.evoluciones.map(evolucion => (
						<tr key={evolucion._id}>
							<td className="w-96">{evolucion.fechadecarga} - {evolucion.hora} hs</td>
							<td className="w-96">{evolucion.mesreferencia} </td>
							<td className="w-96">{evolucion.profesional}</td>
							<td>
								<Typography
									component={Link}
									to={{ pathname: `${AUTH_CONFIG.domain}/evolucion/file/${evolucion._id}` }}
									target="_blank"
									className="truncate"
									style={{
										color: 'inherit',
										textDecoration: 'underline'
									}}
								>
									Ver evolución
								</Typography>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default BasicInfoTab;
