import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { PayPalButton } from 'react-paypal-button-v2';
import { createPCBuilderSale } from '../../../actions/orderActions';
import { showAlert } from '../../../actions/alertActions';
import getCurrentExchange from '../../../utils/getCurrentExchange';
import getPayPalClientId from '../../../utils/getPayPalClientId';

import Spinner from '../../../components/layout/Spinner';

const ProcessPCOrderScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [dollarAmount, setDollarAmount] = useState(0);
  const [dollarPriceReady, setDollarPriceReady] = useState(false);
  const [paypalClientId, setPayPalClientId] = useState('');

  const { selectedProducts } = useSelector((state) => state.pcBuilder);

  const { loading } = useSelector((state) => state.order);

  // Calculate subtotal
  let subtotalPrice = 0;
  selectedProducts.forEach((product) => {
    subtotalPrice += parseFloat(product.price);
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
      cartProducts: selectedProducts.map((product) => ({
        id: product.id,
        numberOfItems: 1,
      })),
    };
    dispatch(createPCBuilderSale(orderData, history));
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

export default ProcessPCOrderScreen;
