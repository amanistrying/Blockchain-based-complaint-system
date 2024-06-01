import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './Constant/constant';
import Login from './Components/Login';
import Connected from './Components/Connected';
import RegisterComplaint from './Components/RegisterComplaint';
import VoteForComplaints from './Components/VoteForComplaints';
import ViewComplaints from './Components/ViewComplaints';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [complaints, setComplaints] = useState([]);
  const [complaintDetails, setComplaintDetails] = useState({
    email: '',
    description: ''
  });

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        setCurrentPage('connected');
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  async function handleHomeClick() {
    setCurrentPage('login');
  }

  let pageContent;
  switch (currentPage) {
    case 'login':
      pageContent = <Login connectWallet={connectToMetamask} />;
      break;
    case 'connected':
      pageContent = <Connected account={account} onPageChange={handlePageChange} />;
      break;
    case 'registerComplaint':
      pageContent = <RegisterComplaint
                      complaintDetails={complaintDetails}
                      handleInputChange={handleInputChange}
                      registerComplaint={registerComplaint}
                    />;
      break;
    case 'voteForComplaints':
      pageContent = <VoteForComplaints
                      complaints={complaints}
                      voteForComplaint={voteForComplaint}
                    />;
      break;
    case 'viewComplaints':
      pageContent = <ViewComplaints complaints={complaints} />;
      break;
    default:
      pageContent = null;
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  }, []);


  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      setIsConnected(true);
      loadComplaints();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  // Convert BigNumber to JavaScript number
  function toNumber(bigNumber) {
    return bigNumber.toNumber();
  }

  async function loadComplaints() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      console.log("Contract Instance:", contractInstance);
      console.log("Account:", account);
      const complaintsList = await contractInstance.viewComplaints();

      const ids = complaintsList[0].map(id => id.toNumber());
      const wallets = complaintsList[1];
      const emails = complaintsList[2];
      const descriptions = complaintsList[3];
      const yesVotes = complaintsList[4].map(votes => votes.toNumber());
      const noVotes = complaintsList[5].map(votes => votes.toNumber());

      const formattedComplaints = ids.map((id, index) => ({
        id: ids[index],
        complainantWallet: wallets[index],
        email: emails[index],
        description: descriptions[index],
        yesVotes: yesVotes[index],
        noVotes: noVotes[index],
      }));

      setComplaints(formattedComplaints);
    } catch (err) {
      console.error("Error loading complaints:", err);
    }
  }

  useEffect(() => {
    if (currentPage === 'viewComplaints') {
      loadComplaints();
    }
  }, [currentPage]);

  async function registerComplaint() {
    try {
        setComplaintDetails(prevDetails => ({
            ...prevDetails,
            email: '',
            description: ''
        }));

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

        // Register the complaint
        const tx = await contractInstance.addComplaint(complaintDetails.email, complaintDetails.description);
        await tx.wait();
        alert('Complaint registered successfully!');

        // Fetch the current number of complaints
        const totalComplaints = await getCurrentNumberOfComplaints();
        alert(`Current number of complaints: ${totalComplaints}`);
    } catch (err) {
        console.error("Error registering complaint:", err);
    }
  }

  async function getCurrentNumberOfComplaints() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, provider);
      const totalComplaints = await contractInstance.totalComplaints();
      return totalComplaints.toNumber();
    } catch (err) {
      console.error("Error fetching current number of complaints:", err);
      return 0;
    }
  }

  async function voteForComplaint(complaintId, voteType) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      loadComplaints();
      const tx = await contractInstance.vote(complaintId, voteType);
      await tx.wait();
      alert('Vote submitted successfully!');
      loadComplaints();
    } catch (err) {
      console.error("Error voting for complaint:", err);
    }
  }

  useEffect(() => {
    if (currentPage === 'voteForComplaints') {
      voteForComplaint();
    }
  }, [currentPage]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setComplaintDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="App">
      <nav className="navbar">
        <button className="home-button" onClick={handleHomeClick}>Home</button>
      </nav>
      {pageContent}
    </div>
  );
}

export default App;
