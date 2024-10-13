import React from 'react';
import { useSelector } from 'react-redux';

const AlertSystem = () => {
  const alerts = useSelector(state => state.alerts);

  return (
    <div>
      {alerts.map((alert, index) => (
        <div key={index} className="alert">
          {alert}
        </div>
      ))}
    </div>
  );
};

export default AlertSystem;