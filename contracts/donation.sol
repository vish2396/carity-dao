// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Donation {
    mapping(address => uint256) public donations;
    address public admin;

    event DonationReceived(address indexed donor, uint256 amount);

    constructor() {
        admin = msg.sender;
    }

    function donate() external payable {
        donations[msg.sender] += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function withdraw(uint256 amount, address payable recipient) external {
        require(msg.sender == admin, "Only admin can withdraw");
        recipient.transfer(amount);
    }
}