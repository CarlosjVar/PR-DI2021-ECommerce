import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../actions/categoryActions';
import { getProductsByNameAndCategory } from '../../actions/productActions';

const SearchProducts = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [searchedName, setSearchedName] = useState('');
  const [searchedCategory, setSearchedCategory] = useState('All');

  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const getCategoryNameById = (id) => {
    if (id === 'All') {
      return id;
    }
    for (let category of categoryList) {
      if (category.id === parseInt(id)) {
        return category.name;
      }
    }
  };

  const searchProducts = () => {
    dispatch(
      getProductsByNameAndCategory(
        searchedName,
        getCategoryNameById(searchedCategory)
      )
    );
    console.log(history.location);
    if (history.location.pathname === '/') {
      history.push(
        `/products?name=${searchedName}&category=${getCategoryNameById(
          searchedCategory
        )}`
      );
    }
  };

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
                <option value="All">Todas las categorías</option>
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
            <Button
              onClick={searchProducts}
              className="btn-secondary btn-block"
            >
              BUSCAR
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SearchProducts;
