import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const AllOrdersTableItem = ({ order }) => {
  const { name, orderId, fecha, monto } = order;

  return (
    <tr>
      <td>{name}</td>
      <td>
        <Moment format="DD/MM/YYYY">{fecha}</Moment>
      </td>
      <td>
        <NumberFormat
          value={monto}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          isNumericString={true}
          prefix={'₡'}
        />
      </td>
      <td>
        <Link className="link" to={`/admin/orders/${orderId}`}>
          Detalles
        </Link>
      </td>
    </tr>
  );
};

AllOrdersTableItem.propTypes = {
  order: PropTypes.object.isRequired,
};

export default AllOrdersTableItem;
