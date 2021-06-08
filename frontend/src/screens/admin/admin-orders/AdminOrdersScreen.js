import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../../actions/orderActions';

import AllOrdersTable from './components/AllOrdersTable';
import Spinner from '../../../components/layout/Spinner';

const AdminOrdersScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { orderList, loading } = useSelector((state) => state.order);

  return (
    <>
      <h2>
        <i className="far fa-list-alt"></i> Órdenes realizadas
      </h2>
      {loading ? (
        <Spinner />
      ) : orderList.length === 0 ? (
        <h4>No hay órdenes registradas</h4>
      ) : (
        <AllOrdersTable orders={orderList.reverse()} />
      )}
    </>
  );
};

export default AdminOrdersScreen;
