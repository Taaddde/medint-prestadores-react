import Typography from '@material-ui/core/Typography';
import { castDates } from 'app/services/dateService/dateService';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductsTab() {
	const sesiones = useSelector(({ eCommerceApp }) => eCommerceApp.order.sesiones);

	castDates(sesiones);
	

	return (
		<div className="table-responsive">
			<table className="simple">
				<thead>
					<tr>
						<th>
							<Typography className="font-semibold">Código</Typography>
						</th>
						<th>
							<Typography className="font-semibold">Descripción</Typography>
						</th>
						<th>
							<Typography className="font-semibold">Cantidad</Typography>
						</th>
						<th>
							<Typography className="font-semibold">Periodicidad</Typography>
						</th>
						<th>
							<Typography className="font-semibold">Desde</Typography>
						</th>
						<th>
							<Typography className="font-semibold">Hasta</Typography>
						</th>
					</tr>
				</thead>
				<tbody>
					{sesiones.map(sesion => (
						<tr key={sesion._id}>
							<td className="w-64">{sesion.prestacion?.codigo}</td>
							<td>
								<Typography
									component={Link}
									to={`/sesion/${sesion._id}`}
									className="truncate"
									style={{
										color: 'inherit',
										textDecoration: 'underline'
									}}
								>
									{sesion.prestacion?.descripcion}
								</Typography>
							</td>
							<td className="w-64">{sesion.cantidad}</td>
							<td className="w-64">{sesion.por}</td>
							<td className="w-64 text-right">
								<span className="truncate">{sesion.fecha_desde}</span>
							</td>
							<td className="w-64 text-right">
								<span className="truncate">{sesion.fecha_hasta}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ProductsTab;
