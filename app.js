const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment-timezone');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hridyansh@1',
  database: 'jio'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Function to get current time in Indian format
const getCurrentTimeInIndianFormat = () => {
  return moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
};

app.get('/getStudents', (req, res) => {
  const sql = `SELECT * FROM student_movements`;
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.post('/addEntry', (req, res) => {
  const { studentId, destination } = req.body;
  const currentTime = getCurrentTimeInIndianFormat();

  // Update studentinfo table with destination and entryTime
  const updateStudentSql = 'UPDATE studentinfo SET destination = ?, entryTime = ? WHERE student_id = ?';
  db.query(updateStudentSql, [destination, currentTime, studentId], (updateErr) => {
    if (updateErr) {
      console.error(updateErr);
      res.status(500).json({ error: 'Failed to update student record' });
      return;
    }
    res.status(200).json({ message: 'Entry recorded successfully' });
  });
});

app.post('/changeEntry', (req, res) => {
  const { studentId } = req.body;
  const currentTime = getCurrentTimeInIndianFormat();
  const sql = 'UPDATE studentinfo SET exitTime = ? WHERE student_id = ?';
  const sql2 = 'INSERT INTO student_movements SELECT * FROM studentinfo WHERE student_id = ?';
  db.query(sql, [currentTime, studentId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update exit time' });
      return;
    }
    db.query(sql2, [studentId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to insert movement record' });
        return;
      }
      res.status(200).json({ message: 'Exit time updated successfully' });
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
