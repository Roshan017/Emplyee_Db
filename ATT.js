const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 7000;

// Connect to MongoDB (replace 'your-database-url' with your actual MongoDB URL)
mongoose.connect('mongodb://127.0.0.1:27017/EMP_Profile', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema and model for the employee data
const AttendanceSchema = new mongoose.Schema({
  id: Number,
  departmentId: String,
  DeprtmentName: Number,
  Hours_Worked: Number,
  Leaves_Taken:Number
});

const ATT = mongoose.model('ATT', AttendanceSchema);

// Set up middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., your HTML and CSS files)
app.use(express.static('public'));

// Handle form submission
app.post('/', async (req, res) => {
  try {
    // Create a new employee instance with data from the form
    const newATT = new ATT({
        id: req.body.id,
        departmentId: req.body.departmentId,
        DepartmentName: req.body.DeprtmentName,
        Hours_Worked: req.body.Hours_Worked,
        Leaves_Taken: req.body.Leaves_Taken
    });

    // Save the employee data to MongoDB
    await newATT.save();

    // Redirect to Front.html after successful form submission
    res.redirect('/EMPFN.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to serve ADD.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/ATT.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
