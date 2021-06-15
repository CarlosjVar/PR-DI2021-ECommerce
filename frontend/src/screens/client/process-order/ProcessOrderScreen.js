import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { PayPalButton } from 'react-paypal-button-v2';
import { createSale } from '../../../actions/orderActions';
import { showAlert } from '../../../actions/alertActions';
import getCurrentExchange from '../../../utils/getCurrentExchange';
import getPayPalClientId from '../../../utils/getPayPalClientId';

import Spinner from '../../../components/layout/Spinner';

const ProcessOrderScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [dollarAmount, setDollarAmount] = useState(0);
  const [dollarPriceReady, setDollarPriceReady] = useState(false);
  const [paypalClientId, setPayPalClientId] = useState('');

  const { products } = useSelector((state) => state.cart);

  const { loading } = useSelector((state) => state.order);

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
    // TODO: Find a better way of solving this
    const preparePaymentData = async () => {
      // Calculate dollar price
      if (isMounted) setDollarPriceReady(false);
      const dollarValue = await getCurrentExchange(totalPrice);
      if (isMounted) setDollarAmount(parseFloat(dollarValue));
      if (isMounted) setDollarPriceReady(true);
      // Get paypal client id
      const clientId = await getPayPalClientId();
      if (isMounted) setPayPalClientId(clientId);
    };
    preparePaymentData();
    // Clean up component before unmounting
    return () => {
      isMounted = false;
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

  const onPaymentError = () => {
    dispatch(
      showAlert({
        message: 'Ocurrió un error al procesar su pago',
        type: 'danger',
      })
    );
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
            {!dollarPriceReady || !paypalClientId || loading ? (
              <Spinner />
            ) : (
              <PayPalButton
                amount={dollarAmount}
                onSuccess={onPaymentSuccess}
                options={{
                  clientId: paypalClientId,
                }}
                onError={onPaymentError}
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
