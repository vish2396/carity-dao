// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract proposal {
    struct Proposal {
        uint id;
        string description;
        uint256 amount;
        address payable recipient;
        uint votes;
        bool executed;
    }

    Proposal[] public proposals;
    address public admin;
    mapping(address => bool) public voters;
    uint public nextProposalId; 

    event ProposalCreated(uint id,string description, uint256 amount, address recipient);
    event ProposalVoted(uint id, address voter);
    event ProposalExecuted(uint id);

    constructor() {
        admin = msg.sender;
    }

    function createProposal(string memory description, uint256 amount, address payable recipient) external {
        require(msg.sender == admin, "Only admin can create proposals");
        proposals.push(Proposal(nextProposalId, description, amount, recipient,0, false));
        emit ProposalCreated(nextProposalId, description, amount, recipient);
        nextProposalId++;
    }

    function vote(uint id) external {
        require(!voters[msg.sender], "You have already voted");
        Proposal storage proposal = proposals[id];
        proposal.votes++;
        voters[msg.sender] = true;
        emit ProposalVoted(id,msg.sender);
    }

    function executeProposal(uint id) external {
        Proposal storage proposal = proposals[id];
        require(msg.sender == admin, "Only admin can execute proposals");
        require(!proposal.executed, "Proposal already executed");
        require(proposal.votes > 0, "Proposal has no votes");
        proposal.recipient.transfer(proposal.amount);
        proposal.executed = true;
        emit ProposalExecuted(id);
    }
}