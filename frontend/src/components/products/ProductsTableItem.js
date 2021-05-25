import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

const ProductsTableItem = ({ product }) => {
  const { name, quantity, price } = product;

  return (
    <tr>
      <td>{name}</td>
      <td>
        <NumberFormat
          value={price}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          isNumericString={true}
          prefix={'₡'}
        />
      </td>
      <td>{quantity}</td>
      <td>
        <Link to="/">Detalles</Link>
      </td>
      <td>
        <Link to="/">Editar</Link>
      </td>
      <td>Eliminar</td>
    </tr>
  );
};

export default ProductsTableItem;
