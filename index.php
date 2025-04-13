<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "auto_entry";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Handle request
if ($method === 'POST') {
  // Get student data from request
  $data = file_get_contents("php://input");
  $student = json_decode($data);

  // Add student to database
  $sql = "INSERT INTO students (id, entry_or_exit, destination, timestamp) VALUES (?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sis", $student->id, $student->entry_or_exit, $student->destination, $student->timestamp);
  $stmt->execute();

  // Return success response
  $response = ['success' => true];
  echo json_encode($response);
} else if ($method === 'GET') {
  // Get all students from database
  $sql = "SELECT * FROM students";
  $result = $conn->query($sql);

  // Convert result to JSON
  $students = [];
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $students[] = $row;
    }
  }

  // Return students list
  $response = ['success' => true, 'students' => $students];
  echo json_encode($response);
} else {
  // Return error response
  $response = ['success' => false, 'error' => 'Invalid request method'];
  echo json_encode($response);
}

// Close connection
$conn->close();
?>