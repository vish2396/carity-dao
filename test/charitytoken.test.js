const CharityToken = artifacts.require("CharityToken");

contract("CharityToken", accounts => {
  it("should put 10000 CharityToken in the first account", async () => {
    const instance = await CharityToken.deployed();
    const balance = await instance.balanceOf(accounts[0]);
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });

  it("should transfer tokens correctly", async () => {
    const instance = await CharityToken.deployed();
    await instance.transfer(accounts[1], 500, { from: accounts[0] });

    const balance1 = await instance.balanceOf(accounts[0]);
    const balance2 = await instance.balanceOf(accounts[1]);

    assert.equal(balance1.toNumber(), 9500, "Amount wasn't correctly taken from the sender");
    assert.equal(balance2.toNumber(), 500, "Amount wasn't correctly sent to the receiver");
  });
});
