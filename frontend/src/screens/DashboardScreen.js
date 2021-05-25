import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';

import ProductsTable from '../components/products/ProductsTable';
import Spinner from '../components/layout/Spinner';

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const { productList, loading } = useSelector((state) => state.product);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <h2 className="mb-4">
        <i className="fa fa-cog"></i> Dashboard (Sesión de {user.fullName})
      </h2>

      {loading ? <Spinner /> : <ProductsTable products={productList} />}
    </>
  );
};

export default DashboardScreen;
