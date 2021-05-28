import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../actions/productActions';
import { getCategories } from '../actions/categoryActions';
import { getSpecifications } from '../actions/specifcationActions';

import NumberFormat from 'react-number-format';
import Spinner from '../components/layout/Spinner';

const AdminProductDetailsScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { productDetails, loading } = useSelector((state) => state.product);

  const { categoryList } = useSelector((state) => state.category);

  const { specificationList } = useSelector((state) => state.specification);

  useEffect(() => {
    dispatch(getSpecifications());
    dispatch(getCategories());
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const getCategoryName = (id) => {
    for (let category of categoryList) {
      if (category.id === id) {
        return category.name;
      }
    }
  };

  console.log(productDetails);

  const getSpecificationName = (id) => {
    for (let specification of specificationList) {
      if (specification.id === id) {
        return specification.name;
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const {
    name,
    price,
    quantity,
    imageFileName,
    categoryId,
    ProductsXSpecifications,
  } = productDetails;

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
      {ProductsXSpecifications && (
        <>
          <h4 className="mt-5">Especificaciones del producto</h4>
          <ListGroup className="mb-5">
            {ProductsXSpecifications.map((spec) => (
              <ListGroup.Item key={spec.id}>
                {getSpecificationName(spec.specificationId)}: {spec.value}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </>
  );
};

export default AdminProductDetailsScreen;
