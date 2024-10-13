const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let sensorData = {
  temperature: 22,
  humidity: 45,
  airQuality: 80,
};

// Endpoint to get sensor data
app.get('/api/sensor-data', (req, res) => {
  res.json(sensorData);
});

// WebSocket server for real-time updates
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify(sensorData));

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Simulate sensor data updates
setInterval(() => {
  sensorData = {
    temperature: Math.random() * 30,
    humidity: Math.random() * 100,
    airQuality: Math.random() * 100,
  };

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(sensorData));
    }
  });
}, 5000);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});