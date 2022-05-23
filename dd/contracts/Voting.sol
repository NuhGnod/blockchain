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
    function viewAllCandidateList() public view returns( Candidate[2] memory c){
        uint256 len = candidateAddrs.length;
        Candidate [2] memory can; 

        for(uint256 i=0; i<len; i++){
            address addr = candidateAddrs[i];
            can[i] = (candidates[addr]);
        }
        return can;
    }
    function candidateEnroll(string memory _name) public {
        Candidate memory candi;
        candi.name = _name;
        candi.votedCount = 0;
        candidates[msg.sender] = candi; 
        candidateAddrs.push(msg.sender);

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
                address  addr = candidateAddrs[i];
                string memory candidateName = candidates[addr].name;
                if(stringCompare(candidateName, _to)){//내가 투표하려는 후보 찾음.
                    candidates[addr].votedCount++;
                }
            }
        }


    }
    function viewCandidatesVotingCount(string memory _to) public view returns(uint256) {
        uint256 len =  candidateAddrs.length;
        if( len > 0){
            for(uint256 i=0; i<len; i++){
                address  addr = candidateAddrs[i];
                string memory candidateName = candidates[addr].name;
                if(stringCompare(candidateName, _to)){
                    return (candidates[addr].votedCount);
                }
            }
        }
        return 0;

    }
    function stringCompare(string memory a, string memory b) public pure returns(bool) {
        return (keccak256(bytes(a)) == keccak256(bytes(b)));
    }
}