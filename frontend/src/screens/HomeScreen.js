import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';

import ProductCarousel from '../components/products/ProductCarousel';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <ProductCarousel products={productList} />
      <section id="about-section">
        <Container>
          <h2>Quienes somos?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic ipsum
            mollitia temporibus alias aspernatur aut, corporis veniam deserunt
            cumque illo ullam soluta odit modi incidunt doloribus reiciendis
            blanditiis eveniet tempora consectetur. Corrupti vitae culpa
            cupiditate modi saepe eos a numquam.
          </p>
        </Container>
      </section>
    </>
  );
};

export default HomeScreen;
