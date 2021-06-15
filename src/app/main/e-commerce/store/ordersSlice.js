import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk('eCommerceApp/orders/getOrders', async () => {

	const options = {
		method: 'GET',
		url: `http://localhost:2000/api/carpeta/prestadores/list?mes=mayo&ano=2021&prestador=605c0250c0f65234d4328ff1`,
		path: '',
		headers: {
			'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MDVjMDI1MGMwZjY1MjM0ZDQzMjhmZjEiLCJub21icmUiOiJPTUlOVCIsImlkX29icmFfc29jaWFsIjoiMjQiLCJlbWFpbCI6Im9taW50QG9taW50LmNvbSIsImlhdCI6MTYyMzI3OTUwMiwiZXhwIjoxNjIzMjg0OTAyfQ.H_JHXG7qGIwWi94yBYXOGIwvziYonKZdoHi76ECPF2A'
		}
	}

	const response = await axios(options);
	const data = await response.data;

	console.log(data);

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
