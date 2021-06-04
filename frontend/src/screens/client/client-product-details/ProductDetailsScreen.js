import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../../actions/productActions';
import NumberFormat from 'react-number-format';

import Spinner from '../../../components/layout/Spinner';

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
          <ListGroup>
            <ListGroup.Item>Precio: {price}</ListGroup.Item>
            <ListGroup.Item>Estado: En stock</ListGroup.Item>
            <ListGroup.Item style={{ paddingBottom: '0.01rem' }}>
              <Form.Group as={Row} controlId="quantity">
                <Form.Label column sm={3}>
                  Cantidad:
                </Form.Label>
                <Col sm={9}>
                  <Form.Control name="quantity" as="select">
                    <option value="1">1</option>
                    <option value="2">1</option>
                    <option value="3">1</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button className="btn-secondary btn-block">
                <i className="fas fa-cart-plus"></i> Agregar al carrito
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsScreen;
