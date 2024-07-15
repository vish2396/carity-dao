const Proposal = artifacts.require("Proposal");

contract("Proposal", accounts => {
  it("should create a proposal", async () => {
    const instance = await Proposal.deployed();
    await instance.createProposal("Build a school", web3.utils.toWei("10", "ether"), accounts[1], { from: accounts[0] });

    const proposal = await instance.proposals(0);
    assert.equal(proposal.description, "Build a school", "Proposal description is incorrect");
    assert.equal(proposal.amount.toString(), web3.utils.toWei("10", "ether"), "Proposal amount is incorrect");
    assert.equal(proposal.recipient, accounts[1], "Proposal recipient is incorrect");
  });

  it("should allow voting on a proposal", async () => {
    const instance = await Proposal.deployed();
    await instance.vote(0, { from: accounts[0] });

    const proposal = await instance.proposals(0);
    assert.equal(proposal.votes.toNumber(), 1, "Proposal votes are incorrect");
  });

  it("should execute a proposal if it has enough votes", async () => {
    const instance = await Proposal.deployed();
    await instance.vote(0, { from: accounts[1] });
    await instance.executeProposal(0, { from: accounts[0] });

    const proposal = await instance.proposals(0);
    assert.equal(proposal.executed, true, "Proposal wasn't executed");
  });
});
