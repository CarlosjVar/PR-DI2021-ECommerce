import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../actions/productActions';

import ProductCarousel from './components/ProductCarousel';
import SearchProducts from '../../../components/products/SearchProducts';
import ShowcaseProductList from '../../../components/products/ShowcaseProductList';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);

  const { isAdmin, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isAdmin) {
    return <Redirect to="/dashboard" />;
  }

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
            Somos una tienda de hardware que busca brindarle el mejor servicio a
            sus clientes a través de componentes de excelente calidad y precio
            accesible. Si necesita armar un computador nuevo o encontrar nuevos
            componentes, puede confiar en nosotros.
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
          <Link
            className="btn btn-secondary btn-block"
            to={isAuthenticated ? '/pc-builder' : '/login'}
          >
            {isAuthenticated
              ? 'Construir computador'
              : 'Inicie sesión para construir su computador'}
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
