import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClientOrders } from '../../../actions/orderActions';

import Spinner from '../../../components/layout/Spinner';
import ClientOrdersTable from './components/ClientOrdersTable';

const OrdersScreen = () => {
  const dispatch = useDispatch();

  const { orderList, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getClientOrders());
  }, [dispatch]);
  return (
    <>
      <h3>
        <i className="far fa-list-alt"></i> Órdenes
      </h3>
      {loading ? <Spinner /> : <ClientOrdersTable orders={orderList} />}
    </>
  );
};

export default OrdersScreen;
