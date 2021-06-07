import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

import SearchProducts from '../../../components/products/SearchProducts';
import Spinner from '../../../components/layout/Spinner';

const SearchProductsResultsScreen = () => {
  const { productList, searchedProductName, productListLoading } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <SearchProducts />
      <Container className="py-5">
        <h2 className="mb-5">Resultados para "{searchedProductName}"</h2>
        {productListLoading ? (
          <Spinner />
        ) : productList.length === 0 ? (
          <h4>No se encontraron resultados</h4>
        ) : (
          productList.map((product) => (
            <Card key={product.id} className="mb-4">
              <Card.Body>
                <Row>
                  <Col md="2">
                    <div className="product-card-img-container">
                      <Image
                        style={{ maxHeight: '128px', maxWidth: '128px' }}
                        src={`/api/utils/image/${product.imageFileName}`}
                        fluid
                      />
                    </div>
                  </Col>
                  <Col md="10">
                    <h5>{product.name}</h5>
                    <p className="mt-3">{product.Categories.name}</p>
                    <p>
                      Precio:{' '}
                      <NumberFormat
                        value={product.price}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        isNumericString={true}
                        prefix={'₡'}
                      />
                    </p>
                    <p style={{ marginBottom: '0' }}>
                      <Link className="link" to={`/products/${product.id}`}>
                        Informacion del producto
                      </Link>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
};

export default SearchProductsResultsScreen;
