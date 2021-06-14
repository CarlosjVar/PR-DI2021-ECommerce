import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInitialProducts } from '../../../actions/pcBuilderActions';

import Spinner from '../../../components/layout/Spinner';

const PCBuilderScreen = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.pcBuilder);

  useEffect(() => {
    dispatch(getInitialProducts());
  }, [dispatch]);

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
            <tbody></tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PCBuilderScreen;
