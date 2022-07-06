console.log(window.ethereum);
/* window.addEventListener('load', function () {
            if (typeof web3 !== 'undefined') {

                console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
                window.web3 = new Web3(web3.currentProvider);
                console.log(Web3.givenProvider);
            } else {
                console.log('No Web3 Detected... using HTTP Provider')
                web3 = new Web3(Web3.givenProvider || "ws://ropsten.infura.io/v3/9a9dcb1ea0784cafb2dc608fdca92642")
                //web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9a9dcb1ea0784cafb2dc608fdca92642"));
                console.log(Web3)
                console.log(Web3.givenProvider);
                
            }
        })
        */
var account;
var VotingContract;
window.addEventListener("load", async function () {
  console.log("ASD");
  if (window.ethereum) {
    console.log(`ethereum`);
    web3 = new Web3(window.ethereum);
    console.log(web3);
  }
  // Legacy dapp browsers...
  else if (typeof web3 !== "undefined") {
    console.log("Web3 Detected! " + web3.currentProvider.constructor.name);
    window.web3 = new Web3(web3.currentProvider);
    console.log(web3);
  }
  // Non-dapp browsers...
  else {
    console.log("No Web3 Detected... using HTTP Provider");
    web3 = new Web3(
      Web3.givenProvider ||
        "ws://ropsten.infura.io/v3/9a9dcb1ea0784cafb2dc608fdca92642"
    );
    //web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9a9dcb1ea0784cafb2dc608fdca92642"));
    console.log(Web3);
    console.log(Web3.givenProvider);
  }
  if (web3) {
    //account = await web3.eth.requestAccounts();
  }
  console.log(web3.version.api);
  VotingContract = web3.eth.contract(
    [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "allTokens",
        outputs: [
          {
            internalType: "string",
            name: "_tokenName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getApproved",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "isApprovedForAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
        ],
        name: "mintNFT",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "viewAllTokens",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "_tokenName",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "_owner",
                type: "address",
              },
            ],
            internalType: "struct NFT.img[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_key",
            type: "address",
          },
        ],
        name: "viewMyTokens",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "_tokenName",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "_owner",
                type: "address",
              },
            ],
            internalType: "struct NFT.img[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    "0x9028E4373DF2B84844ACD0a1b3158B4cF0500689"
  );

  Voting = VotingContract.at("0x9028E4373DF2B84844ACD0a1b3158B4cF0500689");
  web3.eth.defaultAccount = "0x5587acE223024b4B9806466eeD79F17518435350";
  console.log(VotingContract);
  console.log(Voting);
  console.log(web3.eth.defaultAccount);
  console.log(web3);
});
gg();
async function gg() {
  console.log(`gg start`);
  try {
    account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(account);
  } catch (error) {
    if (error.code === 4001) {
      // User rejected request
    }
    console.log(error);
  }

  console.log("gg end");
}
console.log(account);
function getBalance() {
  var address, wei, balance;
  address = document.getElementById("address").value;
  try {
    web3.eth.getBalance(address, function (error, wei) {
      console.log(address);
      console.log(web3.eth.accounts);
      if (!error) {
        var balance = web3.fromWei(wei, "ether");
        document.getElementById("output").innerHTML = balance + " ETH";
      }
    });
  } catch (err) {
    document.getElementById("output").innerHTML = err;
  }
}
function _mintNFT() {
  Voting.mintNFT();
}
