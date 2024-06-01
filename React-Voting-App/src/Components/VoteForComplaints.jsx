import React from 'react';

function VoteForComplaints({ complaints, voteForComplaint }) {
  if (!complaints || complaints.length === 0) {
    return <div className="vote-for-complaints">No complaints to display</div>;
  }

  const handleVote = (complaintId, voteType) => {
    // Call the voteForComplaint function passed from parent component
    voteForComplaint(complaintId, voteType);
  };

  return (
    <div className="vote-for-complaints">
      <h2 className="vote-for-complaints-title">Vote for Complaints</h2>
      {complaints.map((complaint, index) => (
        <div key={index} className="complaint-container">
            <div className='part1'>
          <div className="complaint-details">
            <p className="complaint-id"><strong>ID:</strong> {complaint.id}</p>
            <p className="complaint-email"><strong>Email:</strong> {complaint.email}</p>
            <p className="complaint-votes"><strong>Votes:</strong> Yes - {complaint.yesVotes}, No - {complaint.noVotes}</p>
          </div>
          <div className="complaint-description">
            <p><strong>Description:</strong> {complaint.description}</p>
          </div>
          </div>
          <div className="part2">
          <div className="vote-buttons">
            <button className="vote-yes-button" onClick={() => handleVote(complaint.id, 'yes')}>Vote Yes</button>
            <button className="vote-no-button" onClick={() => handleVote(complaint.id, 'no')}>Vote No</button>
            </div>
          </div>
        </div>
        
      ))}
    </div>
  );
}

export default VoteForComplaints;
