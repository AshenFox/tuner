const express = require('express');
const path = require('path');

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Set static folder
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
