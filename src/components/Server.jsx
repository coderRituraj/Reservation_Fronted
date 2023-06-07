const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Define the endpoint
app.get(`/fare/${vehicle}/${distance}`, (req, res) => {
  // Your logic to handle the request goes here

  // Simulate a 403 error
  res.status(403).send('Forbidden');
});

// Start the server
app.listen(8081, () => {
  console.log('Server started on port 8081');
});
