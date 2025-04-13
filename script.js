// Define a function to create and populate a table with student records
const displayStudents = (students) => {
  let tableHtml = '<table border="1"><tr><th>Student ID</th><th>Destination</th><th>Entry Time</th><th>Exit Time</th></tr>';

  students.forEach(student => {
    tableHtml += `<tr>
      <td>${student.student_id}</td>
      <td>${student.destination}</td>
      <td>${student.entryTime}</td>
      <td>${student.exitTime}</td>
    </tr>`;
  });

  tableHtml += '</table>';
  studentList.innerHTML = tableHtml;
};

document.getElementById('entry-or-exit').addEventListener('change', function() {
  var destinationLabel = document.getElementById('destination-label');
  var destinationInput = document.getElementById('destination');
  
  if (this.value === 'entry') {
      destinationLabel.style.display = 'none';
      destinationInput.style.display = 'none';
  } else {
      destinationLabel.style.display = 'block';
      destinationInput.style.display = 'block';
  }
});

const form = document.getElementById('entry-form');
const studentList = document.getElementById('student-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const studentId = formData.get('student-id');
  const entryOrExit = formData.get('entry-or-exit');
  let destination = "";
  
  if (entryOrExit === "exit") {
     destination = formData.get('destination');
  }
  
  try {
    if (entryOrExit === "exit") {
      const response = await fetch('http://localhost:3000/addEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId,
          destination
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add entry');
      }
  
      form.reset();
    }
    else {
      const response = await fetch('http://localhost:3000/changeEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to change entry');
      }
  
      form.reset();
    }
  } catch (error) {
    console.error(error);
  }
});

// Event listener for the 'student_records' button
document.getElementById('student-records').addEventListener('click', () => {
  getStudents(); // Call getStudents when 'student_records' button is clicked
});

// Define a function to fetch and display student records
const getStudents = async () => {
  try {
    const response = await fetch('http://localhost:3000/getStudents');
    const data = await response.json();
    displayStudents(data); // Call displayStudents to render the table
  } catch (error) {
    console.error(error);
  }
};
