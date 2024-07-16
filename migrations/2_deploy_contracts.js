const CharityToken = artifacts.require("charitytoken");
const Donation = artifacts.require("donation");
const Proposal = artifacts.require("proposal");

module.exports = function (deployer) {
  const initialSupply = 10000; // Example initial supply for CharityToken
  deployer.deploy(CharityToken, initialSupply);
  deployer.deploy(Donation);
  deployer.deploy(Proposal);
};
