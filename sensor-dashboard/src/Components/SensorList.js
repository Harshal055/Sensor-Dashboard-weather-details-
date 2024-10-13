import React from 'react';
import { useSelector } from 'react-redux';

const SensorList = () => {
  const sensors = useSelector(state => state.sensorData);

  return (
    <ul>
      {Object.keys(sensors).map(key => (
        <li key={key}>
          {key}: {sensors[key]}
        </li>
      ))}
    </ul>
  );
};

export default SensorList;