import React from 'react'
import "./AdminDashboard.css"

const AdminViewComplaint = ({ complaints, updateComplaintStatus }) => {
  if (!complaints || complaints.length === 0) {
    return <div>No complaints to display</div>;
  }

  return (
    <div className="complaint-view-section">
  <ul className="complaint-list-section">
    {complaints.map((complaint, index) => (
      <li key={index} className="single-complaint">
        <div className="complaint-details-section">
          <p><strong>ID:</strong> {complaint.id}</p>
          <p><strong>Email:</strong> {complaint.email}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Yes Votes:</strong> {complaint.yesVotes}</p>
          <p><strong>No Votes:</strong> {complaint.noVotes}</p>
        </div>
        <div className="complaint-action-section">
          <p><strong>Status:</strong> {complaint.Status === 'In_process' ? 'In Process' : 'Active'}</p>
          <button onClick={() => updateComplaintStatus(complaint.id, complaint.Status === 'Active' ? 1 : 0)}>
            Change Status
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

  

  )
}

export default AdminViewComplaint