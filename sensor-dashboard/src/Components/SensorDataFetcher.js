import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSensorData } from '../../Store.js'; // Corrected path

const SensorDataFetcher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(updateSensorData(data));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return null;
};

export default SensorDataFetcher;