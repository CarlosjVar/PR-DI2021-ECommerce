import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardScreen = () => {
  const history = useHistory();

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, isAdmin } = auth;

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      history.push('/');
    } else {
    }
  }, [history, isAdmin, isAuthenticated]);

  return (
    <div>
      <h4>Dashboard screen</h4>
    </div>
  );
};

export default DashboardScreen;
