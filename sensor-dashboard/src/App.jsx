import React from 'react';
import { Provider } from 'react-redux';
import store from '../Store.js';
import SensorDataFetcher from './Components/SensorDataFetcher.js';
import RealTimeChart from './Components/RealTimeChart.js';
import AlertSystem from './Components/AlertSystem.js';
import SensorList from './Components/SensorList.js';
import './App.css'; // Import the CSS file for styling

const App = () => (
  <Provider store={store}>
    <div className="app-container">
      <header className="app-header">
        <h1>Sensor Dashboard</h1>
      </header>
      <main className="app-main">
        <SensorDataFetcher />
        <div className="charts-container">
          <RealTimeChart />
        </div>
        <div className="alerts-container">
          <AlertSystem />
        </div>
        <div className="sensor-list-container">
          <SensorList />
        </div>
      </main>
    </div>
  </Provider>
);

export default App;