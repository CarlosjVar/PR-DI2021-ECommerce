import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

const PCComponentSelection = ({ categoryKey, categoryName, products }) => {
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    if (products) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  const onProductChange = (productId) => {
    const productsWithId = products.filter(
      (product) => product.id === parseInt(productId)
    );
    setSelectedProduct(productsWithId[0]);
    // TODO: Set selected product in store
    setIsProductSelected(true);
  };

  const onProductRemoved = () => {
    setIsProductSelected(false);
    // TODO: Remove selected product from store
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
          value={selectedProduct.price}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          isNumericString={true}
          prefix={'₡'}
        />
      </td>
      <td>
        <Button onClick={onProductRemoved} className="btn-danger">
          Eliminar
        </Button>
      </td>
    </tr>
  );
};

export default PCComponentSelection;
