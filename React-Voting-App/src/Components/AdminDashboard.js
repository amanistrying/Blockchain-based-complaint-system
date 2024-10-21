import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import {contractAbi, contractAddress  } from '../Constant/constant'
import AdminViewComplaint from './AdminViewComplaint';

const AdminDashboard = (props) => {
  const [complaints, setComplaints] = useState([]);
  const [address, setAddress] = useState('');
  const [showComplaint, setShowComplaint] = useState(false);
  
  useEffect(() => {
    async function loadComplaints() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        console.log("Contract Instance:", contractInstance);
        console.log("Account:", props.account);
        const complaintsList = await contractInstance.viewComplaints();
  
        const ids = complaintsList[0].map(id => id.toNumber());
        const wallets = complaintsList[1];
        const emails = complaintsList[2];
        const descriptions = complaintsList[3];
        const yesVotes = complaintsList[4].map(votes => votes.toNumber());
        const noVotes = complaintsList[5].map(votes => votes.toNumber());
        const statuses = complaintsList[6];
  
        const formattedComplaints = ids.map((id, index) => ({
          id: ids[index],
          complainantWallet: wallets[index],
          email: emails[index],
          description: descriptions[index],
          yesVotes: yesVotes[index],
          noVotes: noVotes[index],
          yesVotePercentage: (yesVotes[index] + noVotes[index]) > 0 ? (yesVotes[index] * 100) / (yesVotes[index] + noVotes[index]) : 0,
          Status: statuses[index]
        }));
  
        // Sort complaints by yes vote percentage (descending order)
        formattedComplaints.sort((a, b) => b.yesVotePercentage - a.yesVotePercentage);
  
        setComplaints(formattedComplaints);
      } catch (err) {
        console.error("Error loading complaints:", err);
      }
    }
    loadComplaints();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin {props.account}!</p>
      <div>
        <h3>Add admin</h3>
        <input
          type="text"
          placeholder="Enter admin address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="button-group">
          <button onClick={() => props.handleAdminAction(address, 'add')}>Add Admin</button>
          <button onClick={() => props.handleAdminAction(address, 'remove')}>Remove Admin</button>
          {!showComplaint && <button onClick={() => setShowComplaint(true)}>Show Complaints</button>}
          {showComplaint && <button onClick={() => setShowComplaint(false)}>Hide Complaints</button>}
        </div>
        
        {showComplaint && <AdminViewComplaint complaints={complaints} updateComplaintStatus={props.updateComplaintStatus}/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
