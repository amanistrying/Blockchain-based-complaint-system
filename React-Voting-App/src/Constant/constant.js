const contractAddress = "0xD5Bca0C2d5794186c1aaD7ef4b1aFCf94d4EE6eD";

const contractAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "removedAdmin",
        type: "address",
      },
    ],
    name: "AdminRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "complaintId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "complainantWallet",
        type: "address",
      },
      { indexed: false, internalType: "string", name: "email", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "ComplaintAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_complaintId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newStatus",
        type: "string",
      },
    ],
    name: "StatusUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "complaintId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      { indexed: false, internalType: "string", name: "vote", type: "string" },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "addAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_email", type: "string" },
      { internalType: "string", name: "_description", type: "string" },
    ],
    name: "addComplaint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "admins",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "complaints",
    outputs: [
      { internalType: "address", name: "complainantWallet", type: "address" },
      { internalType: "string", name: "email", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "uint256", name: "yesVotes", type: "uint256" },
      { internalType: "uint256", name: "noVotes", type: "uint256" },
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "enum Voting.Status", name: "status", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "isAdmin",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "removeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalComplaints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_complaintId", type: "uint256" },
      { internalType: "enum Voting.Status", name: "_newStatus", type: "uint8" },
    ],
    name: "updateComplaintStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "viewComplaints",
    outputs: [
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "address[]", name: "", type: "address[]" },
      { internalType: "string[]", name: "", type: "string[]" },
      { internalType: "string[]", name: "", type: "string[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "string[]", name: "", type: "string[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_complaintId", type: "uint256" },
      { internalType: "string", name: "_vote", type: "string" },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export { contractAbi, contractAddress };
