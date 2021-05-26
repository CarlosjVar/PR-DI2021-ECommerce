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
import { getSpecifications } from '../actions/specifcationActions';

const AddProductScreen = () => {
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state.category);

  const { specificationList } = useSelector((state) => state.specification);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSpecifications());
  }, [dispatch]);

  console.log(categoryList);

  console.log(specificationList);

  return (
    <div>
      <h2>Add product</h2>
    </div>
  );
};

export default AddProductScreen;
