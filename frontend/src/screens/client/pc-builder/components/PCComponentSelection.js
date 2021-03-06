import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import {
  addPCBuilderProduct,
  removePCBuilderProduct,
  getSuggestedMotherboards,
  clearPCBuilderCategory,
  getSuggestedCoolers,
  getSuggestedMemories,
} from '../../../../actions/pcBuilderActions';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';

const getSpecValue = (arr, id) => {
  for (let element of arr) {
    if (element.id === id) {
      return element.value;
    }
  }
  return null;
};

const PCComponentSelection = ({ categoryKey, categoryName, products }) => {
  const dispatch = useDispatch();

  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const { selectedProducts } = useSelector((state) => state.pcBuilder);

  useEffect(() => {
    selectedProducts.forEach((product) => {
      // Set current selected product
      if (product.Categories.name === categoryName) {
        setSelectedProduct(product);
        setIsProductSelected(true);
      }
    });
  }, [selectedProducts, categoryName]);

  const onProductChange = (productId) => {
    if (productId !== 'ninguno') {
      const productsWithId = products.filter(
        (product) => product.id === parseInt(productId)
      );
      setSelectedProduct(productsWithId[0]);
      dispatch(addPCBuilderProduct(productsWithId[0]));
      setIsProductSelected(true);
      // Change other components based on the component selected
      if (
        categoryKey === 'processor' &&
        productsWithId[0] &&
        productsWithId[0].Specifications
      ) {
        // Get suggested motherboards and coolers
        const specValue = getSpecValue(productsWithId[0].Specifications, 2);
        if (specValue) {
          dispatch(getSuggestedMotherboards(specValue));
          dispatch(getSuggestedCoolers(specValue));
        } else {
          dispatch(clearPCBuilderCategory('motherboard'));
          dispatch(clearPCBuilderCategory('cooler'));
        }
      } else if (
        categoryKey === 'motherboard' &&
        productsWithId[0] &&
        productsWithId[0].Specifications
      ) {
        // Get suggested memories
        const specValue = getSpecValue(productsWithId[0].Specifications, 3);
        if (specValue) {
          dispatch(getSuggestedMemories(specValue));
        } else {
          dispatch(clearPCBuilderCategory('memory'));
        }
      }
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

PCComponentSelection.propTypes = {
  categoryKey: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default PCComponentSelection;
