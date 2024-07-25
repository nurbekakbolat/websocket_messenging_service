const express = require('express');
const http = require('http');
const { Server } = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new Server({ server });
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');

const port = 8080;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/messages', messageRoutes);

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

global.wss = wss;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
