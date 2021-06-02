import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';

import ProductCarousel from '../components/products/ProductCarousel';
import SearchProducts from '../components/products/SearchProducts';
import ShowcaseProductList from '../components/products/ShowcaseProductList';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <ProductCarousel
        products={
          productList.length > 5 ? productList.slice(0, 5) : productList
        }
      />
      <section className="section" id="about-section">
        <Container>
          <h2>¿Quiénes somos?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic ipsum
            mollitia temporibus alias aspernatur aut, corporis veniam deserunt
            cumque illo ullam soluta odit modi incidunt doloribus reiciendis
            blanditiis eveniet tempora consectetur. Corrupti vitae culpa
            cupiditate modi saepe eos a numquam.
          </p>
        </Container>
      </section>
      <section className="section" id="pc-build-section">
        <Container>
          <h3>¿Desea construir su propio PC?</h3>
          <p>
            Nuestra página brinda un módulo incríble que facilita la
            construcción de computadores.
          </p>
          <Link className="btn btn-secondary btn-block" to="/">
            Construir computador
          </Link>
        </Container>
      </section>
      <SearchProducts />
      <section className="section" id="most-selled-section">
        <Container>
          <h2>Productos más nuevos</h2>
          <ShowcaseProductList
            products={
              productList.length > 3 ? productList.slice(0, 3) : productList
            }
          />
        </Container>
      </section>
    </>
  );
};

export default HomeScreen;
