const express = require('express');
const path = require('path');
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (e.g., your HTML, CSS, and JS files)
app.use(express.static('public'));

// Route to serve Front.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Front.html'));
});
app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Front.html'));
  });
  

// Route to handle button click and redirect to ADD.html
app.get('/ADD.html', (req, res) => {
  res.redirect('/ADD.html');
});
app.post('/ADD.html',(req,res) =>{
    res.redirect('/Front.html')
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
