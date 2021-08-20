import axios from "axios";
import AUTH_CONFIG from "../jwtService/jwtConfig";


export const getDocumentos = async (idCarpeta) => {

	const token = localStorage.getItem('token');

    console.log(idCarpeta);

	const options = {
		method: 'GET',
		url: `${AUTH_CONFIG.domain}/v1/prestador/documento/consentimiento/list/${idCarpeta}`,
		headers: {
			'Authorization': token
		}
	}

	const response = await axios(options);
	const data = await response.data;

	return data;
};