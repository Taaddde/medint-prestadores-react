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
	]
};


export default ECommerceAppConfig;
