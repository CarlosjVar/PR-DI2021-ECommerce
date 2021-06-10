import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const ClientOrdersTableItem = ({ order }) => {
  const { id, createdAt, totalPrice } = order;

  // console.log(order);

  return (
    <tr>
      <td>
        <Moment format="DD/MM/YYYY">{createdAt}</Moment>
      </td>
      <td>
        <NumberFormat
          value={totalPrice}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          isNumericString={true}
          prefix={'₡'}
        />
      </td>
      <td>
        <Link className="link" to={`/orders/${id}`}>
          Detalles
        </Link>
      </td>
    </tr>
  );
};

ClientOrdersTableItem.propTypes = {
  order: PropTypes.object.isRequired,
};

export default ClientOrdersTableItem;
