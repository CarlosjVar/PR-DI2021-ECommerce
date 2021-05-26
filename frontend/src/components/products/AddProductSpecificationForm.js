import React from 'react';
import PropTypes from 'prop-types';

const AddProductSpecificationForm = ({
  specifications,
  addSpecification,
  removeSpecification,
}) => {
  return <div></div>;
};

AddProductSpecificationForm.propTypes = {
  specifications: PropTypes.array.isRequired,
  addSpecification: PropTypes.func.isRequired,
  removeSpecification: PropTypes.func.isRequired,
};

export default AddProductSpecificationForm;
