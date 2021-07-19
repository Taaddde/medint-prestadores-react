import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AUTH_CONFIG from 'app/services/jwtService/jwtConfig';
import axios from 'axios';
import AUTH_CONFIG from '../../../services/jwtService/jwtConfig';

export const getOrder = createAsyncThunk('eCommerceApp/order/getOrder', async params => {

	const token = localStorage.getItem('token');

	const options = {
		method: 'GET',
		url: `${AUTH_CONFIG.domain}/sesion/list?carpeta=${params.orderId}`,
		headers: {
			'Authorization': token
		}
	}

	const response = await axios(options);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveOrder = createAsyncThunk('eCommerceApp/order/saveOrder', async order => {
	const response = await axios.post('/api/e-commerce-app/order/save', order);
	const data = await response.data;

	return data;
});

const orderSlice = createSlice({
	name: 'eCommerceApp/order',
	initialState: null,
	reducers: {
		resetOrder: () => null
	},
	extraReducers: {
		[getOrder.fulfilled]: (state, action) => action.payload,
		[saveOrder.fulfilled]: (state, action) => action.payload
	}
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
