import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../actions/productActions';
import NumberFormat from 'react-number-format';

const ProductsTableItem = ({ product }) => {
  const { id, name, quantity, price } = product;

  const dispatch = useDispatch();

  const onDeleteClick = () => {
    if (window.confirm('¿Desea eliminar el producto?')) {
      dispatch(deleteProduct(id));
    }
  };

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
        <Link to={`/products/${id}`}>Detalles</Link>
      </td>
      <td>
        <Link to={`/products/${id}/edit`}>Editar</Link>
      </td>
      <td>
        <Button
          onClick={onDeleteClick}
          style={{ margin: '0' }}
          className="btn-danger"
        >
          Eliminar
        </Button>
      </td>
    </tr>
  );
};

export default ProductsTableItem;
