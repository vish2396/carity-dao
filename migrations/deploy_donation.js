import {artifacts} from "truffle"

const Donation = artifacts.require("donation");

module.exports = function (deployer) {
  deployer.deploy(Donation);
};
