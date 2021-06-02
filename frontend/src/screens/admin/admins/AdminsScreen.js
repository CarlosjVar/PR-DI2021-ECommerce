import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { getAdmins } from '../../../actions/adminActions';

import AdminsTable from './components/AdminsTable';
import Spinner from '../../../components/layout/Spinner';

const AdminsScreen = () => {
  const dispatch = useDispatch();

  const { adminList, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  return (
    <>
      <h3>
        <i className="fa fa-users"></i> Administradores
      </h3>
      <Row className="mt-4">
        <Col md="9">
          {loading ? <Spinner /> : <AdminsTable admins={adminList} />}
        </Col>
        <Col md="3">
          <Link to="/admins/add" className="btn btn-secondary btn-block">
            <i className="fa fa-plus"></i> Agregar administrador
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default AdminsScreen;
