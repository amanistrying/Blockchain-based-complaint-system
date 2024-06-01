import React from "react";

const Connected = (props) => {
    const handleRegisterComplaint = () => {
        props.onPageChange('registerComplaint');
    };

    const handleVoteForComplaints = () => {
        props.onPageChange('voteForComplaints');
    };

    const handleViewComplaints = () => {
        props.onPageChange('viewComplaints');
    };

    return (
        <div className="connected-container">
            <h1 className="connected-header">You are Connected to Metamask</h1>
            <p className="connected-account">Metamask Account: {props.account}</p>
            <div className="connected-buttons">
                <button onClick={handleRegisterComplaint}>Register a Complaint</button>
                <button onClick={handleVoteForComplaints}>Vote for Complaints</button>
                <button onClick={handleViewComplaints}>View Complaints</button>
            </div>
        </div>
    );
};

export default Connected;
