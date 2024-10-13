import { createStore } from 'redux';

const initialState = {
  sensorData: {},
  alerts: [],
};

const UPDATE_SENSOR_DATA = 'UPDATE_SENSOR_DATA';

export const updateSensorData = (data) => ({
  type: UPDATE_SENSOR_DATA,
  payload: data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SENSOR_DATA:
      const alerts = [];
      if (action.payload.temperature > 25) {
        alerts.push('Temperature exceeds 25°C');
      }
      if (action.payload.humidity > 70) {
        alerts.push('Humidity exceeds 70%');
      }
      if (action.payload.airQuality > 90) {
        alerts.push('Air Quality is poor');
      }
      return {
        ...state,
        sensorData: action.payload,
        alerts,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;