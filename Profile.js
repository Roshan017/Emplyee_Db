const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your-database-url' with your actual MongoDB URL)
mongoose.connect('mongodb://127.0.0.1:27017/EMP_Profile', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema and model for the employee data
const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: String,
  contactNo: String,
  departmentId: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Set up middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., your HTML and CSS files)
app.use(express.static('public'));

// Handle form submission
app.post('/', async (req, res) => {
  try {
    // Create a new employee instance with data from the form
    const newEmployee = new Employee({
      id: req.body.id,
      name: req.body.name,
      age: req.body.age,
      contactNo: req.body.contactNo,
      departmentId: req.body.departmentId,
    });

    // Save the employee data to MongoDB
    await newEmployee.save();

    // Redirect to Front.html after successful form submission
    res.redirect('/Front.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to serve ADD.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/ADD.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
