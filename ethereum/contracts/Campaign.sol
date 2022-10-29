// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*
 * @title Campaignfactory
 * @dev Create health campaigns instances by manager for HealthChain
 * @for more documentation and value check the slide representation
 */
 contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
/**
 * @title Campaign
 * @dev Create health campaigns by manager for HealthChain
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Campaign {

    /* not definition
    * but introduction of a new type.
    */
    struct Request {
        string description;
        bool hasValue;
        address recipient;
        bool hasApproved;
        bool complete;
    }

    Request[] public requests;
    address public coa;
    uint public minimumContribution;
    address[] public actors;

    modifier restricted() {
        require( msg.sender == coa);
        _; 
    }

    /*
     * @dev create campaign
     * @param get minimum from screen
     */
    constructor(uint minimum, address creator) {
        coa = creator;
        minimumContribution = minimum;
    }

    /*
     * @dev contribute to campaign 
     * @require value greater than minimum Contribution
     */
    function contribute() public payable {
        require(msg.value > minimumContribution);
        actors.push(msg.sender);
    }

    function createRequest(string memory description, bool hasValue, address recipient) public {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.hasValue= hasValue;
        newRequest.recipient= recipient;
        newRequest.complete= false;
    }

    function approveRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.hasApproved);
        request.hasApproved = true;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        request.complete = true;
    }

    function getCampaignDetails() public view returns 
    (uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            coa
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}