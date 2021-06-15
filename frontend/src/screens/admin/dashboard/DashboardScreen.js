import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, getTopProducts } from '../../../actions/productActions';

import ProductsTable from './components/ProductsTable';
import TopProductsTable from './components/TopProductsTable';
import TopProductsChart from './components/TopProductsChart';
import Spinner from '../../../components/layout/Spinner';

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const { productList, productListLoading, topProducts, topProductsLoading } =
    useSelector((state) => state.product);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getTopProducts());
  }, [dispatch]);

  return (
    <>
      <h2 className="mb-4">
        <i className="fa fa-cog"></i> Dashboard (Sesión de {user.fullName})
      </h2>
      {productListLoading ? (
        <Spinner />
      ) : (
        <ProductsTable products={productList} />
      )}
      <Row>
        <Col md="3">
          <Link to="/products/add" className="btn btn-block btn-secondary">
            <i className="fa fa-plus"></i> Agregar producto nuevo
          </Link>
        </Col>
      </Row>
      {topProductsLoading ? (
        <Spinner />
      ) : (
        <div className="my-5">
          <h2>Productos más vendidos</h2>
          <Row>
            <Col lg="6">
              <TopProductsTable products={topProducts} />
            </Col>
            <Col lg="6">
              <TopProductsChart products={topProducts} />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default DashboardScreen;
