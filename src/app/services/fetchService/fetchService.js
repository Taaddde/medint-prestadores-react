import axios from "axios";
import AUTH_CONFIG from "../jwtService/jwtConfig";


export const getDocumentos = async (idCarpeta) => {

	const token = localStorage.getItem('token');

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

export const existeFactura = async(mes, anio, prestador) => {

	const token = localStorage.getItem('token');

	const options = {
		method: 'GET',
		url: `${AUTH_CONFIG.domain}/factura/get?periodo=${mes}&ano=${anio}&prestador=${prestador}`,
		headers: {
			'Authorization': token
		}
	}

	const response = await axios(options);
	const data = await response.data;

	return data;

}