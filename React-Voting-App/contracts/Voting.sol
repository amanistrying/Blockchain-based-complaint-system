// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Voting {
    
    struct Complaint {
        address complainantWallet;
        string email;
        string description;
        uint yesVotes;
        uint noVotes;
        bool exists;
        mapping(address => bool) voters;
    }
    
    address public owner;
    mapping(address => bool) public admins;
    mapping(uint => Complaint) public complaints;
    uint public totalComplaints;
    
    event ComplaintAdded(uint complaintId, address complainantWallet, string email, string description);
    event Voted(uint complaintId, address voter, string vote);
    event AdminAdded(address indexed newAdmin);
    event AdminRemoved(address indexed removedAdmin);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Not an admin");
        _;
    }

    constructor() {
        owner = msg.sender; // Set the contract deployer as the initial owner
        admins[owner] = true; // Owner is also an admin
    }

    // Function to add a new admin
    function addAdmin(address _admin) external onlyAdmin {
        require(!admins[_admin], "Already an admin");
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    // Function to remove an admin
    function removeAdmin(address _admin) external onlyAdmin {
        require(admins[_admin], "Not an admin");
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }
    
    // Function to check if an address is an admin
    function isAdmin(address _admin) external view returns (bool) {
        return admins[_admin]; // Returns true if _admin is an admin, false otherwise
    }

    // Function to add a complaint
    function addComplaint(string memory _email, string memory _description) public {
        require(bytes(_email).length > 0 && bytes(_description).length > 0, "Email and description must be provided");
        
        totalComplaints++;
        complaints[totalComplaints].complainantWallet = msg.sender;
        complaints[totalComplaints].email = _email;
        complaints[totalComplaints].description = _description;
        complaints[totalComplaints].yesVotes = 0;
        complaints[totalComplaints].noVotes = 0;
        complaints[totalComplaints].exists = true;
        
        emit ComplaintAdded(totalComplaints, msg.sender, _email, _description);
    }
    
    // Function to vote on a complaint
    function vote(uint _complaintId, string memory _vote) public {
        require(_complaintId > 0 && _complaintId <= totalComplaints, "Invalid complaint ID");
        require(complaints[_complaintId].exists, "Complaint does not exist");
        require(bytes(_vote).length > 0 && (keccak256(abi.encodePacked((_vote))) == keccak256(abi.encodePacked(("yes"))) || keccak256(abi.encodePacked((_vote))) == keccak256(abi.encodePacked(("no")))), "Invalid vote");
        require(!complaints[_complaintId].voters[msg.sender], "You have already voted");
        
        if (keccak256(abi.encodePacked((_vote))) == keccak256(abi.encodePacked(("yes")))) {
            complaints[_complaintId].yesVotes++;
        } else {
            complaints[_complaintId].noVotes++;
        }
        
        complaints[_complaintId].voters[msg.sender] = true;
        
        emit Voted(_complaintId, msg.sender, _vote);
    }
    
    // Function to view all complaints
    function viewComplaints() public view returns (uint[] memory, address[] memory, string[] memory, string[] memory, uint[] memory, uint[] memory) {
        uint[] memory ids = new uint[](totalComplaints);
        address[] memory wallets = new address[](totalComplaints);
        string[] memory emails = new string[](totalComplaints);
        string[] memory descriptions = new string[](totalComplaints);
        uint[] memory yesVotes = new uint[](totalComplaints);
        uint[] memory noVotes = new uint[](totalComplaints);
        
        for (uint i = 1; i <= totalComplaints; i++) {
            ids[i - 1] = i;
            wallets[i - 1] = complaints[i].complainantWallet;
            emails[i - 1] = complaints[i].email;
            descriptions[i - 1] = complaints[i].description;
            yesVotes[i - 1] = complaints[i].yesVotes;
            noVotes[i - 1] = complaints[i].noVotes;
        }
        
        return (ids, wallets, emails, descriptions, yesVotes, noVotes);
    }
}
