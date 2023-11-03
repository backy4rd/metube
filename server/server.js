const path = require('path');
const express = require('express');

const PORT = process.env.PORT ?? 8080
const app = express()

app.get('/app.json', (_req, res) => {
  res.json({
    socketPath: process.env.SOCKET_PATH,
    socketHost: process.env.SOCKET_HOST,
    mediaHost: process.env.MEDIA_HOST,
    apiHost: process.env.API_HOST,
    rmtpHost: process.env.RMTP_HOST,
    liveHost: process.env.LIVE_HOST
  });
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT)
})
