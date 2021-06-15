import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearPCBuilderProducts,
  getInitialProducts,
} from '../../../actions/pcBuilderActions';

import PCComponentSelection from './components/PCComponentSelection';
import PCBuilderCheckout from './components/PCBuilderCheckout';
import Spinner from '../../../components/layout/Spinner';

let componentCategories = {
  processor: 'Procesador',
  motherboard: 'Tarjeta Madre',
  cooler: 'CPU Cooler',
  graphicsCard: 'Tarjeta Gráfica',
  memory: 'Memoria RAM',
  storage: 'Almacenamiento ',
  case: 'Case',
  powerSupply: 'Fuente de poder',
};

const PCBuilderScreen = () => {
  const dispatch = useDispatch();

  const { products, selectedProducts, loading } = useSelector(
    (state) => state.pcBuilder
  );

  useEffect(() => {
    dispatch(clearPCBuilderProducts());
    dispatch(getInitialProducts(componentCategories));
  }, [dispatch]);

  // Create pc component selectors
  let productSelectors = [];
  for (let componentName in componentCategories) {
    productSelectors.push(
      <PCComponentSelection
        key={componentName}
        categoryKey={componentName}
        categoryName={componentCategories[componentName]}
        products={
          products[componentName]
            ? products[componentName].filter((product) => product.quantity > 0)
            : []
        }
      />
    );
  }

  return (
    <>
      <h2>
        <i className="fas fa-laptop"></i> Constructor de computadores
      </h2>
      <p>
        Seleccione los componentes que desee, el sistema se encargará de
        recomendar aquellos componentes que sean compatibles
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <div className="table-responsive mt-5">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Categoria</th>
                <th scope="col">Componente</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>{productSelectors}</tbody>
          </table>
        </div>
      )}
      <PCBuilderCheckout selectedProducts={selectedProducts} />
    </>
  );
};

export default PCBuilderScreen;
