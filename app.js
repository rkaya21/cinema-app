const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Server listening
app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});
