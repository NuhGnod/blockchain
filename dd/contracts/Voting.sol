//SPDX-License-Identifier: MIT

pragma solidity >=0.4.21;
contract Voting {
    uint256 private totalVotingCount;

    struct Voting {
        string name;
        uint256 votingCount;

    }
    struct Candidate {
        string name;
        uint256 votedCount;
    }
    mapping (address => Voting) public voters;
    mapping (address => Candidate) public candidates;

    address[] votersAddrs;
    address[] public candidateAddrs;

    constructor() public {
        totalVotingCount = 0;
    }

    function vote(string memory _name, string memory _to) public {
        totalVotingCount++;

        if(voters[msg.sender].votingCount > 0){//already vote.
            voters[msg.sender].votingCount++;
            return;
        }
        assert(bytes(_name).length > 0);

        Voting memory voter;
        voter.name = _name;
        voter.votingCount = 1;
        voters[msg.sender] = voter;
        
        votersAddrs.push(msg.sender);
        uint256 len =  candidateAddrs.length;
        if( len > 0){
            for(uint256 i=0; i<len; i++){
                if(candidateAddrs[i].name == _to){
                    
            }}
        }


    }
}