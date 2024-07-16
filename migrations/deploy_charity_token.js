import {artifacts} from "truffle"

const CharityToken = artifacts.require("charitytoken");

module.exports = function (deployer) {
  deployer.deploy(CharityToken, 10000);  // Example initial supply
};
