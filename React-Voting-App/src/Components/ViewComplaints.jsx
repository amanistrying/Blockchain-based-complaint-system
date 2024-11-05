import React from 'react';

const formatStatus = (status) => {
  return status.replace(/_/g, ' '); // Replace underscores with spaces
};

function ViewComplaints({ complaints }) {
  if (!complaints || complaints.length === 0) {
    return <div>No complaints to display</div>;
  }

  return (
    <div className="view-complaints">
      <h2>View Complaints</h2>
      <ul className="complaints-list">
        {complaints.map((complaint, index) => (
          <li key={index} className="complaint-item">
            <p><strong>ID:</strong> {complaint.id}</p>
            <p><strong>Email:</strong> {complaint.email}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p><strong>Yes Votes:</strong> {complaint.yesVotes}</p>
            <p><strong>No Votes:</strong> {complaint.noVotes}</p>
            <p><strong>Status:</strong> {formatStatus(complaint.Status)}</p>
          </li>
        ))}
      </ul>
    </div>


  );
}

export default ViewComplaints;
