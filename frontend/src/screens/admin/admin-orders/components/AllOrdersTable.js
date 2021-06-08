import React from 'react';
import PropTypes from 'prop-types';

import AllOrdersTableItem from './AllOrdersTableItem';

const AllOrdersTable = ({ orders }) => {
  return (
    <div className="table-responsive mt-5">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Realizada por</th>
            <th scope="col">Fecha</th>
            <th scope="col">Monto Total</th>
            <th scope="col">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <AllOrdersTableItem key={order.orderId} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

AllOrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default AllOrdersTable;
