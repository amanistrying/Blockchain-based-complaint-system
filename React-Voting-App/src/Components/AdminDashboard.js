import React, {useState} from 'react';

const AdminDashboard = (props) => {
  const [address, setAddress] = useState('');
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
