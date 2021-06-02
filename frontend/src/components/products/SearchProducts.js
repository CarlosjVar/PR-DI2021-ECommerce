import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../actions/categoryActions';

const SearchProducts = () => {
  const dispatch = useDispatch();

  const [searchedName, setSearchedName] = useState('');
  const [searchedCategory, setSearchedCategory] = useState(undefined);

  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // TODO: Implement search functionality

  return (
    <section className="section" id="search-products-section">
      <Container>
        <h3>BUSCAR PRODUCTOS</h3>
        <br />
        <Row className="px-3">
          <Col md="3" style={{ padding: '0' }}>
            <Form.Group controlId="searchedCategory">
              <Form.Control
                onChange={(e) => setSearchedCategory(e.target.value)}
                value={searchedCategory}
                as="select"
              >
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md="7" style={{ padding: '0' }}>
            <Form.Group>
              <Form.Control
                onChange={(e) => setSearchedName(e.target.value)}
                value={searchedName}
                type="text"
              />
            </Form.Group>
          </Col>
          <Col md="2">
            <Button className="btn-secondary btn-block">BUSCAR</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SearchProducts;
