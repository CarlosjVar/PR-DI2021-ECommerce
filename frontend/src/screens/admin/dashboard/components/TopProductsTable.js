import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopProductsTable = ({ products }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Ventas</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.count}</td>
              <td>
                <Link className="link" to="/">
                  Realizar descuento
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TopProductsTable.propTypes = {
  products: PropTypes.array.isRequired,
};

export default TopProductsTable;
