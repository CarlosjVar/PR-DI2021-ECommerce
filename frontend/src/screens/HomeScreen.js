import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>
        <i className="fa fa-home"></i> Home Screen component
      </h1>
    </div>
  );
};

export default HomeScreen;
