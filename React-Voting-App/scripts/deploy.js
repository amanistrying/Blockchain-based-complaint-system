const { ethers } = require("hardhat");

async function main() {
  // Get the ContractFactory for the Complaints contract
  const Complaints = await ethers.getContractFactory("Voting");

  // Deploy the contract with the specified constructor arguments
  const complaints = await Complaints.deploy();

  // Wait for the contract to be deployed
  await complaints.deployed();

  console.log("Complaints contract deployed to:", complaints.address);
}

// Run the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
