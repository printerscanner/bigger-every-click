const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const dataFilePath = path.join(__dirname, 'visitData.json');

let visitCount = 0;

// Load existing visit count from a JSON file (if it exists)
if (fs.existsSync(dataFilePath)) {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  visitCount = JSON.parse(data).visitCount || 0;
}

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get the visit count
app.get('/getVisitCount', (req, res) => {
  res.json({ visitCount });
});

// Increment the visit count and save it to a JSON file
app.get('/incrementVisitCount', (req, res) => {
  visitCount += 1;

  // Save the updated visit count to a JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify({ visitCount }), 'utf-8');

  res.json({ visitCount });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
