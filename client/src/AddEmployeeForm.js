import React, { useState } from "react";
import "./AddEmployeeForm.css";

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.employeeId.match(/^[a-zA-Z0-9]{1,10}$/))
      newErrors.employeeId =
        "Employee ID must be alphanumeric and max 10 characters";
    if (!formData.email.match(/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      newErrors.email = "Invalid email format";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Phone Number must be 10 digits";
    if (!formData.department) newErrors.department = "Department is required";
    if (
      !formData.dateOfJoining ||
      new Date(formData.dateOfJoining) > new Date()
    )
      newErrors.dateOfJoining = "Date of Joining cannot be in the future";
    if (!formData.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to add employee");
      }
      setSuccessMessage("Employee added successfully");
      handleReset(); // Clear form after successful submission
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReset = () =>
    setFormData({
      firstName: "",
      lastName: "",
      employeeId: "",
      email: "",
      phoneNumber: "",
      department: "",
      dateOfJoining: "",
      role: "",
    });

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {/* First Name */}
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      {/* Last Name */}
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      {/* Employee ID */}
      <div className="form-group">
        <label>Employee ID</label>
        <input
          type="text"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={(e) =>
            setFormData({ ...formData, employeeId: e.target.value })
          }
        />
        {errors.employeeId && (
          <span className="error">{errors.employeeId}</span>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      {/* Phone Number */}
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />
        {errors.phoneNumber && (
          <span className="error">{errors.phoneNumber}</span>
        )}
      </div>

      {/* Department */}
      <div className="form-group">
        <label>Department</label>
        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
        />
        {errors.department && (
          <span className="error">{errors.department}</span>
        )}
      </div>

      {/* Date of Joining */}
      <div className="form-group">
        <label>Date of Joining</label>
        <input
          type="date"
          value={formData.dateOfJoining}
          onChange={(e) =>
            setFormData({ ...formData, dateOfJoining: e.target.value })
          }
        />
        {errors.dateOfJoining && (
          <span className="error">{errors.dateOfJoining}</span>
        )}
      </div>

      {/* Role */}
      <div className="form-group">
        <label>Role</label>
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        />
        {errors.role && <span className="error">{errors.role}</span>}
      </div>

      <button type="submit">Add Employee</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default AddEmployeeForm;
