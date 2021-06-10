import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {
  getProductDetails,
  editProduct,
} from '../../../actions/productActions';

import Spinner from '../../../components/layout/Spinner';

import './ApplyDiscountScreen.css';

const ApplyDiscountScreen = () => {
  const { id } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const [discountPercentage, setDiscountPercentage] = useState(1);

  const { productDetails, productDetailsLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(discountPercentage) || discountPercentage > 100) {
      const newPrice =
        parseFloat(productDetails.price) -
        (discountPercentage / 100) * parseFloat(productDetails.price);
      // Create new data
      const productData = {
        ...productDetails,
        price: newPrice,
        specifications: productDetails.ProductsXSpecifications,
        category: productDetails.categoryId,
      };
      dispatch(editProduct(productData, id, history));
    }
  };

  return productDetailsLoading ? (
    <Spinner />
  ) : (
    <Row>
      <Col md="6" className="mx-auto">
        <div className="discount-card">
          <div className="discount-card-header">
            <h3>Aplicar descuento</h3>
          </div>
          <div className="discount-card-body">
            <form onSubmit={onFormSubmit}>
              <Form.Control
                type="number"
                min="1"
                max="100"
                value={discountPercentage}
                onChange={(e) =>
                  setDiscountPercentage(parseFloat(e.target.value))
                }
                name="discountPercentage"
              />
              <Button
                type="submit"
                disabled={isNaN(discountPercentage)}
                className="btn-primary btn-block mt-5"
              >
                Aplicar descuento
              </Button>
            </form>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ApplyDiscountScreen;
