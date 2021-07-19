import { Typography } from "@material-ui/core";
import { castDatesDocumentos } from "app/services/dateService/dateService";
import AUTH_CONFIG from "app/services/jwtService/jwtConfig";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function PricingTab(props) {

	const data = useSelector(({ eCommerceApp }) => eCommerceApp.product);

	if(data) castDatesDocumentos(data.archivos);

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
					{data && data.archivos.map(archivo => (
							<tr key={archivo._id}>
								<td className="w-96">{archivo.desde}</td>
								<td className="w-96">{archivo.hasta} </td>
								<td className="w-96">{archivo.nombre}</td>
								<td>
									<Typography
										component={Link}
										to={{ pathname: `${AUTH_CONFIG.domain}/archivo/get/${archivo._id}` }}
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

export default PricingTab;
