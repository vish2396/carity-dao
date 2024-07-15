const CharityToken = artifacts.require("CharityToken");

module.exports = function (deployer) {
  deployer.deploy(CharityToken, 10000);  // Example initial supply
};
