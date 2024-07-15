const Proposal = artifacts.require("proposal");

module.exports = function (deployer) {
  deployer.deploy(Proposal);
};
