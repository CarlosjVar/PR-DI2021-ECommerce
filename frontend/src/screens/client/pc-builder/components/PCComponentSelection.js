import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import {
  addPCBuilderProduct,
  removePCBuilderProduct,
} from '../../../../actions/pcBuilderActions';

import NumberFormat from 'react-number-format';

const PCComponentSelection = ({ categoryKey, categoryName, products }) => {
  const dispatch = useDispatch();

  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const onProductChange = (productId) => {
    if (productId !== 'ninguno') {
      const productsWithId = products.filter(
        (product) => product.id === parseInt(productId)
      );
      setSelectedProduct(productsWithId[0]);
      dispatch(addPCBuilderProduct(productsWithId[0]));
      setIsProductSelected(true);
    }
  };

  const onProductRemoved = () => {
    setSelectedProduct({});
    setIsProductSelected(false);
    dispatch(removePCBuilderProduct(selectedProduct.id));
  };

  return (
    <tr>
      <td>{categoryName}</td>
      <td>
        {!isProductSelected ? (
          <Form.Control
            name={categoryKey}
            onChange={(e) => onProductChange(e.target.value)}
            as="select"
          >
            <option value="ninguno">Ningun producto seleccionado</option>
            {products &&
              products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </Form.Control>
        ) : (
          selectedProduct.name
        )}
      </td>
      <td>
        <NumberFormat
          value={isProductSelected ? selectedProduct.price : '0'}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          isNumericString={true}
          prefix={'₡'}
        />
      </td>
      <td>
        {isProductSelected && (
          <Button onClick={onProductRemoved} className="btn-danger">
            Eliminar
          </Button>
        )}
      </td>
    </tr>
  );
};

export default PCComponentSelection;
