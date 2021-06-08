import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import ECommerceAppConfig from 'app/main/e-commerce/ECommerceAppConfig';

const routeConfigs = [
	ExampleConfig,
	LoginConfig,
	ECommerceAppConfig
];


const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/home" />
	}
];

export default routes;
