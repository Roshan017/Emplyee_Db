const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
const port = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/EMP_Profile', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const attSchema = new mongoose.Schema({
    id: Number,
    departmentId: String,
    DeprtmentName: Number,
    Hours_Worked: Number,
    Leaves_Taken:Number
});

const departmentSchema = new mongoose.Schema({
    id: Number,
    departmentId: Number,
    Deprtment: String,
    Manager: String
});

const employeeSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: String,
    contactNo: String,
    departmentId: String,
});

const salarySchema = new mongoose.Schema({
 
  id: Number,
  departmentId: String,
  DeprtmentName: Number,
  Hours_Worked: Number,
  Leaves_Taken:Number
});

const Att = mongoose.model('Att', attSchema);
const Department = mongoose.model('Department', departmentSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Salary = mongoose.model('Salary', salarySchema);

app.use(express.json());

app.delete('/delete/:id', async (req, res) => {
    try {
      const idToDelete = req.params.id;
  
      await Att.findOneAndDelete({ id: idToDelete });
      await Department.findOneAndDelete({ id: idToDelete });
      await Employee.findOneAndDelete({ id: idToDelete });
      await Salary.findOneAndDelete({ id: idToDelete });
  
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/DLT.html');
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
