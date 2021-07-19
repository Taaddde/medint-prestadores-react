import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
					},
			},
		},
	},
	routes: [
		{
			path: '/home/:orderId',
			component: lazy(() => import('./order/Order'))
		},
		{
			path: '/home',
			component: lazy(() => import('./orders/Orders'))
		},
		{
			path: '/sesion/:sesionId',
			component: lazy(() => import('./product/Product'))
		},
	]
};


export default ECommerceAppConfig;
