import express from 'npm:express';
import path from 'node:path';

const app = express();
const port = 3000;

const __dirname = new URL('.', import.meta.url).pathname;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes with Vue.js router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});