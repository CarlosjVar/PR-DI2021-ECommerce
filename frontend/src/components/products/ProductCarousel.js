import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

import NumberFormat from 'react-number-format';

const ProductCarousel = ({ products }) => {
  return (
    <Carousel
      pause="hover"
      style={{ backgroundColor: '#e3e3e3', paddingTop: '1.2rem' }}
      controls={false}
    >
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <Link to="/">
            <Image src={`/api/utils/image/${product.imageFileName}`} fluid />
            <Carousel.Caption className="carousel-caption">
              <h4>
                {product.name} (
                <NumberFormat
                  value={product.price}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  isNumericString={true}
                  prefix={'₡'}
                />
                )
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
