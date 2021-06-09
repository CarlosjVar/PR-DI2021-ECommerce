import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const AdminsTableItem = ({ admin }) => {
  const { email, fullName, createdAt } = admin;

  return (
    <tr>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>
        <Moment format="DD/MM/YYYY">{createdAt}</Moment>
      </td>
    </tr>
  );
};

AdminsTableItem.propTypes = {
  admin: PropTypes.object.isRequired,
};

export default AdminsTableItem;
