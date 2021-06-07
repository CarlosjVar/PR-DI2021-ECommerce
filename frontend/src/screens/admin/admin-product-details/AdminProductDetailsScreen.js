import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../../actions/productActions';
import { getCategories } from '../../../actions/categoryActions';
import { getSpecifications } from '../../../actions/specifcationActions';

import NumberFormat from 'react-number-format';
import Spinner from '../../../components/layout/Spinner';

const AdminProductDetailsScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { productDetails, productDetailsLoading } = useSelector(
    (state) => state.product
  );

  const { categoryList } = useSelector((state) => state.category);

  const { specificationList } = useSelector((state) => state.specification);

  useEffect(() => {
    dispatch(getSpecifications());
    dispatch(getCategories());
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const getCategoryName = (id) => {
    for (let category of categoryList) {
      if (category.id === id) {
        return category.name;
      }
    }
  };

  const getSpecificationName = (id) => {
    for (let specification of specificationList) {
      if (specification.id === id) {
        return specification.name;
      }
    }
  };

  const {
    name,
    price,
    quantity,
    imageFileName,
    categoryId,
    ProductsXSpecifications,
  } = productDetails;

  return productDetailsLoading ? (
    <Spinner />
  ) : (
    <>
      <Row>
        <Col md="8">
          <div className="image-container mb-4">
            <Image
              style={{ maxHeight: '380px' }}
              src={
                imageFileName === 'default_img' || !imageFileName
                  ? '/img/placeholder-image.jpg'
                  : `/api/utils/image/${imageFileName}`
              }
              fluid
            />
          </div>
        </Col>
        <Col md="4">
          <h2>{name}</h2>
          <hr />
          <p style={{ fontSize: '17px' }}>
            <strong>Precio: </strong>
            <NumberFormat
              value={price}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              isNumericString={true}
              prefix={'₡'}
            />
          </p>
          <hr />
          <p style={{ fontSize: '17px' }}>
            <strong>Cantidad: </strong> {quantity}
          </p>
          <hr />
          <p style={{ fontSize: '17px' }}>
            <strong>Categoría: </strong> {getCategoryName(categoryId)}
          </p>
          <hr />
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
    </>
  );
};

export default AdminProductDetailsScreen;
