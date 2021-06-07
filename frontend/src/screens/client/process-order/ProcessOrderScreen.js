import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import getCurrentExchange from '../../../utils/getCurrentExchange';
import { PayPalButton } from 'react-paypal-button-v2';

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
        <div className="process-order-card">
          <div className="process-order-header">
            <Row className="mb-2">
              <Col md="6">
                <h4>CompuHardware</h4>
              </Col>
              <Col md="6">
                <h4 className="price-display">
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
          <div className="process-order-payment">
            <p>Seleccione uno de los métodos de pago disponibles:</p>
            <PayPalButton
              amount={dollarAmount}
              onSuccess={(details, data) => {
                console.log(details, data);
              }}
              shippingPreference="NO_SHIPPING"
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProcessOrderScreen;
