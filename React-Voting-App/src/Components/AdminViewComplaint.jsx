import React from 'react'

const AdminViewComplaint = ({complaints, updateComplaintStatus}) => {
    if (!complaints || complaints.length === 0) {
        return <div>No complaints to display</div>;
      }
    
      return (
        <div className="view-complaints">
          <h2>View Complaints</h2>
          <ul>
            {complaints.map((complaint, index) => (
              <li key={index}>
                <p><strong>ID:</strong> {complaint.id}</p>
                <p><strong>Email:</strong> {complaint.email}</p>
                <p><strong>Description:</strong> {complaint.description}</p>
                <p><strong>Yes Votes:</strong> {complaint.yesVotes }</p>
                <p><strong>No Votes:</strong> {complaint.noVotes }</p>
                <p><strong>Status:</strong> {complaint.Status === 'In_process' ? 'In Process' : 'Active'}</p>
                <button onClick={() => updateComplaintStatus(complaint.id, complaint.Status === 'Active' ? 1 : 0)}>Change Status</button>
              </li>
            ))}
          </ul>
        </div>
      )
}

export default AdminViewComplaint