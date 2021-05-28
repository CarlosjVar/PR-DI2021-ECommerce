import React from 'react';
import AdminsTableItem from './AdminsTableItem';

const AdminsTable = ({ admins }) => {
  const adminItems = admins.map((admin) => (
    <AdminsTableItem key={admin.email} admin={admin} />
  ));

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Fecha de registro</th>
          </tr>
        </thead>
        <tbody>{adminItems}</tbody>
      </table>
    </div>
  );
};

export default AdminsTable;
