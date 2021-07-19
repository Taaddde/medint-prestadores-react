import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import AUTH_CONFIG from '../../../services/jwtService/jwtConfig';


export const getUrl = (date, id) => {

	const splitdate = date.split('-');
	const year = splitdate[0];
	const month = splitdate[1];

	return `${AUTH_CONFIG.domain}/v1/prestador/carpeta/list?mes=${month}&ano=${year}&prestador=${id}`;
	

}

export const getOrders = createAsyncThunk('eCommerceApp/orders/getOrders', async (url) => {

	const token = localStorage.getItem('token');

	const options = {
		method: 'GET',
		url: `${url}`,
		headers: {
			'Authorization': token
		}
	}

	const response = await axios(options);
	const data = await response.data;

	return data;
});

export const removeOrders = createAsyncThunk(
	'eCommerceApp/orders/removeOrders',
	async (orderIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-orders', { orderIds });

		return orderIds;
	}
);

const ordersAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = ordersAdapter.getSelectors(
	state => state.eCommerceApp.orders
);

const ordersSlice = createSlice({
	name: 'eCommerceApp/orders',
	initialState: ordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOrdersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOrders.fulfilled]: ordersAdapter.setAll,
		[removeOrders.fulfilled]: (state, action) => ordersAdapter.removeMany(state, action.payload)
	}
});

export const { setOrdersSearchText } = ordersSlice.actions;

export default ordersSlice.reducer;
