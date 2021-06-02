import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import ShowcaseProductItem from './ShowcaseProductItem';

const ShowcaseProductList = ({ products }) => {
  return (
    <Row>
      {products.map((product) => (
        <Col md="4" key={product.id}>
          <ShowcaseProductItem productInfo={product} />
        </Col>
      ))}
    </Row>
  );
};

ShowcaseProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ShowcaseProductList;
