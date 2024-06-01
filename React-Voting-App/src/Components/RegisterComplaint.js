import React from 'react';

function RegisterComplaint({ complaintDetails, handleInputChange, registerComplaint }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    registerComplaint();
  };

  return (
    <div className='container'>
    <div className="complaint-form">
      <h2>Register a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={complaintDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={complaintDetails.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
    </div>
  );
}

export default RegisterComplaint;
