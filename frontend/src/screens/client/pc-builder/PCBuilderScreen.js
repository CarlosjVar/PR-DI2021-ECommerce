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
      <h1>PC Builder Screen</h1>
      {loading ? <Spinner /> : <p>Rasengan</p>}
    </>
  );
};

export default PCBuilderScreen;
