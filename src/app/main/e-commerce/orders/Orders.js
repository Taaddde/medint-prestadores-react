import FusePageCarded from '@fuse/core/FusePageCarded';
import Login2Page from 'app/main/login/Login';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import reducer from '../store';
import OrdersHeader from './OrdersHeader';
import OrdersTable from './OrdersTable';

function Orders() {

	const isAuthenticated = useSelector(state => state.auth.user.data.autenticado);

	if(isAuthenticated){
		return (
			<FusePageCarded
				classes={{
					content: 'flex',
					contentCard: 'overflow-hidden',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<OrdersHeader />}
				content={<OrdersTable />}
				innerScroll
			/>
		);
	}
	else{
		return(
			<Redirect to="/login" />
		);
		
	}

	
}

export default withReducer('eCommerceApp', reducer)(Orders);
