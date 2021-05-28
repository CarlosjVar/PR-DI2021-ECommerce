import React from 'react';
import ProductsTableItem from './ProductsTableItem';

const ProductsTable = ({ products }) => {
  const productItems = products.map((product) => (
    <ProductsTableItem key={product.id} product={product} />
  ));

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Detalles</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>{productItems}</tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
