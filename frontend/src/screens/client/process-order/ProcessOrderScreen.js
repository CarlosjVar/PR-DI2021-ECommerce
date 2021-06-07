import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import getCurrentExchange from '../../../utils/getCurrentExchange';
import { PayPalButton } from 'react-paypal-button-v2';
import { createSale } from '../../../actions/orderActions';
import api from '../../../utils/api';
import axios from 'axios';

import Spinner from '../../../components/layout/Spinner';

const ProcessOrderScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [dollarAmount, setDollarAmount] = useState(0);
  const [dollarPriceReady, setDollarPriceReady] = useState(false);
  const [paypalClientId, setPayPalClientId] = useState('');

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
    let isMounted = true;
    const source = axios.CancelToken.source();

    const getPayPalClientId = async () => {
      try {
        const { data } = await api.get('/api/config/paypal', {
          cancelToken: source.token,
        });
        const { paypalClientId } = data;
        if (isMounted) setPayPalClientId(paypalClientId);
      } catch (error) {
        isMounted = false;
        source.cancel();
      }
    };
    const getDollarValue = async () => {
      if (isMounted) {
        setDollarPriceReady(false);
        const dollarValue = await getCurrentExchange(totalPrice);
        setDollarAmount(parseFloat(dollarValue));
        setDollarPriceReady(true);
      }
    };
    const preparePaymentData = async () => {
      await getDollarValue();
      await getPayPalClientId();
    };
    preparePaymentData();

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [totalPrice]);

  const onPaymentSuccess = (details, data) => {
    const { payerID, orderID } = data;
    const orderData = {
      paypalPayerId: payerID,
      paypalOrderId: orderID,
      cartProducts: products.map((product) => ({
        id: product.id,
        numberOfItems: product.numberOfItems,
      })),
    };
    dispatch(createSale(orderData, history));
  };

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
            {!dollarPriceReady || !paypalClientId ? (
              <Spinner />
            ) : (
              <PayPalButton
                amount={dollarAmount}
                onSuccess={onPaymentSuccess}
                options={{
                  clientId: paypalClientId,
                }}
                shippingPreference="NO_SHIPPING"
              />
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProcessOrderScreen;
