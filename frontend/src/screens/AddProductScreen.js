import React, { useEffect } from 'react';
import {
  Col,
  Row,
  Card,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../actions/categoryActions';

const AddProductScreen = () => {
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  console.log(categoryList);

  return (
    <div>
      <h2>Add product</h2>
    </div>
  );
};

export default AddProductScreen;
