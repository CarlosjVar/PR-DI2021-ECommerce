import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../../actions/productActions';
import NumberFormat from 'react-number-format';

import Spinner from '../../../components/layout/Spinner';
import AddToCart from './components/AddToCart';

const ProductDetailsScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { productDetails, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Container className="pt-4">
        <Spinner />
      </Container>
    );
  }

  const { name, price, imageFileName } = productDetails;

  return (
    <Container className="pt-4">
      <Row>
        <Col md="8">
          <div className="image-container">
            <Image
              style={{ maxHeight: '380px' }}
              src={`/api/utils/image/${imageFileName}`}
              fluid
            />
          </div>
        </Col>
        <Col md="4">
          <h3>{name}</h3>
          <hr />
          <p style={{ fontSize: '17px' }}>
            <strong>
              Precio:{' '}
              <NumberFormat
                value={price}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                isNumericString={true}
                prefix={'₡'}
              />
            </strong>
          </p>
          <hr />
          <AddToCart productInfo={productDetails} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsScreen;
