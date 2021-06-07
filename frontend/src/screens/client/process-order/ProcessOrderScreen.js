import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import getCurrentExchange from '../../../utils/getCurrentExchange';

const ProcessOrderScreen = () => {
  const [dollarAmount, setDollarAmount] = useState(0);

  const { products } = useSelector((state) => state.cart);

  // Calculate subtotal
  let subtotalPrice = 0;
  products.forEach((product) => {
    subtotalPrice += parseFloat(product.price) * product.numberOfItems;
  });
  // Calculate total price
  const taxes = subtotalPrice * 0.13;
  const totalPrice = subtotalPrice + taxes;

  useEffect(() => {
    const getDollarValue = async () => {
      const dollarValue = await getCurrentExchange(totalPrice);
      setDollarAmount(parseFloat(dollarValue));
    };
    // Fetch currency exchange values
    getDollarValue();
  }, [totalPrice]);

  return (
    <Row>
      <Col className="mx-auto" md="6">
        <div style={{ border: '1px solid #333' }}>
          <div style={{ borderBottom: '1px solid #333', padding: '0.8rem' }}>
            <Row className="mb-2">
              <Col md="6">
                <h4>CompuHardware</h4>
              </Col>
              <Col md="6">
                <h4 style={{ textAlign: 'right' }}>
                  Total:{' '}
                  <NumberFormat
                    value={totalPrice}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    isNumericString={false}
                    prefix={'₡'}
                  />
                </h4>
              </Col>
            </Row>
            <p style={{ margin: '0', textAlign: 'right' }}>
              <Link className="link" to="/cart">
                Información de la orden
              </Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProcessOrderScreen;
