import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductDetails,
  getProductsByCategory,
} from '../../../actions/productActions';
import { getCategories } from '../../../actions/categoryActions';
import { getSpecifications } from '../../../actions/specifcationActions';
import NumberFormat from 'react-number-format';

import Spinner from '../../../components/layout/Spinner';
import AddToCart from './components/AddToCart';
import ShowcaseProductList from '../../../components/products/ShowcaseProductList';

const ProductDetailsScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const {
    productList,
    productDetails,
    productDetailsLoading,
    productListLoading,
  } = useSelector((state) => state.product);

  const { categoryList } = useSelector((state) => state.category);

  const { specificationList } = useSelector((state) => state.specification);

  // Gets the specification name
  const getSpecificationName = (id) => {
    for (let specification of specificationList) {
      if (specification.id === id) {
        return specification.name;
      }
    }
  };

  // Gets the category name
  const getCategoryName = useCallback(
    (id) => {
      for (let category of categoryList) {
        if (category.id === id) {
          return category.name;
        }
      }
    },
    [categoryList]
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getCategories());
    dispatch(getSpecifications());
  }, [dispatch, id]);

  useEffect(() => {
    // Get related products by category
    dispatch(getProductsByCategory(getCategoryName(productDetails.categoryId)));
  }, [dispatch, getCategoryName, productDetails]);

  if (productDetailsLoading) {
    return (
      <Container className="py-4">
        <Spinner />
      </Container>
    );
  }

  const { name, price, imageFileName, ProductsXSpecifications } =
    productDetails;

  return (
    <Container className="py-4">
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
      {ProductsXSpecifications && (
        <>
          <h4 className="mt-5 mb-4">Especificaciones del producto</h4>
          <ListGroup className="mb-5">
            {ProductsXSpecifications.map((spec) => (
              <ListGroup.Item key={spec.id}>
                {getSpecificationName(spec.specificationId)}: {spec.value}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
      <h3>Productos relacionados</h3>
      {productListLoading ? (
        <Spinner />
      ) : (
        <ShowcaseProductList products={productList} />
      )}
    </Container>
  );
};

export default ProductDetailsScreen;
