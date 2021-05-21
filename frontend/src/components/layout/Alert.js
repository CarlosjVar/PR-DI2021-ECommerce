import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  const alertItems = alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.type}`}>
      {alert.message}
    </div>
  ));
  return <>{alertItems}</>;
};

export default Alert;
