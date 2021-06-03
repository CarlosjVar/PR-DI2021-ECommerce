import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../../actions/productActions';

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

  const { name, price } = productDetails;

  return (
    <Container className="pt-4">
      <h2>{name}</h2>
      <p>{price}</p>
    </Container>
  );
};

export default ProductDetailsScreen;
