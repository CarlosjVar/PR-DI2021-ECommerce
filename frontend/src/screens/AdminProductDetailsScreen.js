import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../actions/productActions';
import { getCategories } from '../actions/categoryActions';

import NumberFormat from 'react-number-format';
import Spinner from '../components/layout/Spinner';

const AdminProductDetailsScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { productDetails, loading } = useSelector((state) => state.product);

  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const getCategoryName = (id) => {
    for (let category of categoryList) {
      console.log('x');
      if (category.id === id) {
        return category.name;
      }
    }
  };

  console.log(productDetails);

  const { name, price, quantity, imageFileName, categoryId } = productDetails;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Row>
        <Col md="8">
          <div className="image-container">
            {imageFileName === 'default_img' && (
              <i className="fas fa-question fa-9x"></i>
            )}
          </div>
        </Col>
        <Col md="4">
          <h2>{name}</h2>
          <hr />
          <p style={{ fontSize: '17px' }}>
            <strong>Precio: </strong>
            <NumberFormat
              value={price}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              isNumericString={true}
              prefix={'₡'}
            />
          </p>
          <hr />
          <p style={{ fontSize: '17px' }}>
            <strong>Cantidad: </strong> {quantity}
          </p>
          <hr />
          <p style={{ fontSize: '17px' }}>
            <strong>Categoría: </strong> {getCategoryName(categoryId)}
          </p>
          <hr />
        </Col>
      </Row>
      <h4></h4>
    </>
  );
};

export default AdminProductDetailsScreen;
