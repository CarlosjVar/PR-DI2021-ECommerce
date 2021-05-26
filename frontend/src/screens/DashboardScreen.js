import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <Row>
        <Col md="4">
          <Link to="/products/add" className="btn btn-block btn-secondary">
            <i className="fa fa-plus"></i> Agregar producto nuevo
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;
