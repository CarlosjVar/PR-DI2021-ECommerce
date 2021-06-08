import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../../actions/orderActions';

const AdminOrderDetailsScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // TODO: Obtener nombre y otros detalles
  const { orderDetails } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const {} = orderDetails;

  return (
    <>
      <h3>Orden de Test ({id})</h3>
    </>
  );
};

export default AdminOrderDetailsScreen;
