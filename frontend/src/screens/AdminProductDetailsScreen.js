import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../actions/productActions';

const AdminProductDetailsScreen = () => {
  const dispatch = useDispatch();

  const { productDetails } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetails());
  }, [dispatch]);

  console.log(productDetails);

  return (
    <div>
      <h1>Product details</h1>
    </div>
  );
};

export default AdminProductDetailsScreen;
