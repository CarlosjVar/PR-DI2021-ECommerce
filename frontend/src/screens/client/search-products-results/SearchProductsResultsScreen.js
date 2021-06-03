import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Image, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

import SearchProducts from '../../../components/products/SearchProducts';
import Spinner from '../../../components/layout/Spinner';

const SearchProductsResultsScreen = () => {
  useEffect(() => {}, []);

  const { productList, searchedProductName, loading } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <SearchProducts />
      <Container>
        <h2 className="my-5">Resultados para "{searchedProductName}"</h2>
        {loading ? (
          <Spinner />
        ) : (
          productList.map((product) => (
            <Card key={product.id} className="mb-4">
              <Card.Body>
                <Row>
                  <Col md="2">
                    <div
                      className="px-1 py-2"
                      style={{
                        border: '1px solid #000',
                        backgroundColor: '#333',
                        textAlign: 'center',
                      }}
                    >
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
                      <Link to={`/products/${product.id}`}>
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
