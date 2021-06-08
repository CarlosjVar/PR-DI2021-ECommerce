import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../../actions/orderActions';

const AdminOrdersScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { orderList } = useSelector((state) => state.order);

  console.log(orderList);

  return (
    <div>
      <h2>AdminOrders</h2>
    </div>
  );
};

export default AdminOrdersScreen;
