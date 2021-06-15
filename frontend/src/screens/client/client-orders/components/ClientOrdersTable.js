import React from 'react';
import PropTypes from 'prop-types';

import ClientOrdersTableItem from './ClientOrdersTableItem';

const ClientOrdersTable = ({ orders }) => {
  return (
    <div className="table-responsive mt-5">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Monto Total</th>
            <th scope="col">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <ClientOrdersTableItem key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ClientOrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default ClientOrdersTable;
