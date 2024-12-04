require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const app = express();

// MySQL database connection using environment variables
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "srikanth",
  password: process.env.DB_PASSWORD || "Srikanth@2004",
  database: process.env.DB_NAME || "form",
});
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Route to add employee
app.post("/employees", async (req, res) => {
  const {
    firstName,
    lastName,
    employeeId,
    email,
    phoneNumber,
    department,
    dateOfJoining,
    role,
  } = req.body;

  // Validation for mandatory fields
  if (
    !firstName ||
    !lastName ||
    !employeeId ||
    !email ||
    !phoneNumber ||
    !department ||
    !dateOfJoining ||
    !role
  ) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  // Query to insert employee data into the database
  const query =
    "INSERT INTO employees (first_name, last_name, employee_id, email, phone_number, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    // Using async/await for the query execution
    const [rows] = await db.execute(query, [
      firstName,
      lastName,
      employeeId,
      email,
      phoneNumber,
      department,
      dateOfJoining,
      role,
    ]);

    // If insertion was successful
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    // Error handling
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ error: "Employee ID or Email already exists" });
    }
    console.error(err); // Log the error for server debugging
    return res.status(500).json({ error: "Database error" });
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
