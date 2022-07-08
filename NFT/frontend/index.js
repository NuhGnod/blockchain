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
var Voting;
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
  VotingContract = new web3.eth.Contract(
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
    "0x72C113fDd8F7A4596c0151DA01DF0fB3E4D5CCAE"
  );
  console.log(VotingContract);

  //   Voting = VotingContract.at("0x72C113fDd8F7A4596c0151DA01DF0fB3E4D5CCAE");
  Voting = VotingContract;
  //   web3.eth.defaultAccount = "0x5587acE223024b4B9806466eeD79F17518435350";
  console.log(Voting);
  console.log(web3.eth.defaultAccount);
  console.log(web3);
  //   console.log(
  //     Voting.mintNFT(
  //       Voting.address,
  //       "https://ipfs.io/ipfs/QmSyj5Hjqux8ecxNo5uEi5v7ZSJVX7aWVo8FbSRviZVWHb",
  //       (err, res) => {
  //         console.log(`minting@`);
  //       }
  //     )
  //   );
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
tx = "";
console.log("asd");
mint_url = document.getElementById("mint_url");
mint_receipt = document.getElementById("receipt");
mint_receipt = addEventListener("click", _receipt);

mint_button = document.getElementById("mint_button");
mint_button.addEventListener("click", _mintNFT);

viewMyToken = document.getElementById("viewMyToken");
viewMyToken.addEventListener("click", _viewMyTokens);

function _viewMyTokens() {
  address = web3.eth.accounts[0];
  console.log(typeof web3.eth.accounts[0]);
  console.log(`Voting.address : ${address}`);
  Voting.methods
    .viewMyTokens(account[0])
    .call()
    .then(res => {
      console.log(res);
    });

  //   Voting.viewMyTokens(
  //     "0x5587acE223024b4B9806466eeD79F17518435350",
  //     function (err, res) {
  //       console.log(err);
  //       console.log(res);
  //     }
  //   );
  $(`#myTokens`).append(`<img  src="" alt="null"
  height="200" width="200">`);
}
function _receipt() {
  console.log(`re`);
  web3.eth.getTransactionReceipt(tx, (err, res) => {
    console.log(`receipt!`);
    console.log(res);
    console.log(err);
  });
}
function _mintNFT() {
  console.log("mint!");
  url = mint_url.value;
  address = "";
  console.log(web3.eth);

  console.log(account[0]);
  Voting.methods
    .mintNFT(account[0], url)
    .send({ from: account[0] })
    .then(function (res) {
      console.log(res);
      tx = res.transactionHash;
    });
}
