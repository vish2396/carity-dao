const Donation = artifacts.require("Donation");

contract("Donation", accounts => {
  it("should accept donations and update balances", async () => {
    const instance = await Donation.deployed();
    await instance.donate({ from: accounts[0], value: web3.utils.toWei("1", "ether") });

    const balance = await instance.balances(accounts[0]);
    assert.equal(balance.toString(), web3.utils.toWei("1", "ether"), "Balance wasn't updated correctly");
  });
});
