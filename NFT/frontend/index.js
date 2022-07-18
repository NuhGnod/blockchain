console.log(window.ethereum);

var account;
var VotingContract;
var Voting;
var userAddress;

window.addEventListener("load", async function () {
  // console.log("ASD");
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
    // web3 = new Web3(
    //   Web3.givenProvider ||
    //     "https://rinkeby.infura.io/v3/c931cd94c93746e3a7d5ccea599834c4"
    // );
    //web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9a9dcb1ea0784cafb2dc608fdca92642"));
    console.log(Web3);
  }

  $(async function () {
    //메타마스크 계정 불러오기
    web3.eth.getAccounts(function (err, accs) {
      // console.log(accs);
      if (err != null) {
        var message =
          "PC 크롬을 이용해주시기 바라며, \n크롬의 확장프로그램 MetaMask를 설치해주세요.";
        alert(message);
        show(message);
        return;
      }
      if (accs.length == 0) {
        var message =
          "Metamask 계정을 가져올 수 없습니다.\nMetamask에 로그인 해주세요.";
        alert(message);
        // show(message);
        return;
      }
      userAddress = accs.toString();
      account = userAddress;
      console.log(`getAccounts 함수 내부 # userAddress : ${userAddress}`);
    });
    console.log(userAddress);
    // if (userAddress == undefined) {
    //   return;
    // }
    //네트워크 확인

    let netID = await window.ethereum.request({
      method: "eth_chainId",
    });
    // console.log(netID);

    var network;
    switch (netID) {
      case "0x1":
        network = "Mainnet";
        break;
      case "0x3":
        network = "Ropsten";
        break;
      case "0x4":
        network = "Rinkeby";
        break;
      case "0x2a":
        network = "Kovan";
        break;
      case "0x5":
        network = "Goerli";
        break;
      default:
        network = "undefined";
    }
    if (network == "undefined") {
      var message = "Metamask 연동 네트워크를 확인할 수 없습니다.";
    }
    console.log(`network : ${network}`);
    //메타마스트 계정 실시간 체크
    var accountInterval = setInterval(() => {
      // console.log(`check account metamask`);
      web3.eth.getAccounts(function (err, accs) {
        if (accs.toString() != userAddress && userAddress != undefined) {
          alert("메타마스크 로그인 계정이 변경되었습니다!!");
          clearInterval(accountInterval);
          userAddress = accs.toString();
          // location.href = "/";
          location.reload();
        } else {
        }
      });
    }, 1000); //accountInterval
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
          inputs: [],
          name: "bal",
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
        {
          inputs: [],
          name: "viewTotalTokenBalance",
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
      ],
      "0xC7b2bBcDf784AC8b80Eb654BdE27CB9D7ce5faB2"
    );

    //   Voting = VotingContract.at("0x72C113fDd8F7A4596c0151DA01DF0fB3E4D5CCAE");
    Voting = VotingContract;
    //   web3.eth.defaultAccount = "0x5587acE223024b4B9806466eeD79F17518435350";
    console.log(Voting);
    console.log(`web3 : `);
    console.log(web3);

    function checkLoginMetaMask() {
      console.log(`checkLoginMetaMask() 함수 내부 # ${userAddress}`);
      web3.eth.getAccounts(function (err, accs) {
        userAddress = accs.toString();
      });
      if (userAddress == undefined) {
        // console.log;
        var message = "Metamask에 로그인 해주세요.";
        alert(message);
        return false;
      }
      return true;
    }

    tx = "";
    // console.log("asd");
    mint_url = document.getElementById("mint_url");
    mint_receipt = document.getElementById("receipt");
    mint_receipt = addEventListener("click", _receipt);

    mint_button = document.getElementById("mint_button");
    mint_button.addEventListener("click", _mintNFT);

    viewMyToken = document.getElementById("viewMyToken");
    viewMyToken.addEventListener("click", _viewMyTokens);

    // getTokenBalance = document.getElementById("getTokenBalance");
    // getTokenBalance.addEventListener("click", _getTokenBalance);
    async function _tokenURI(id) {
      uri = await Voting.methods
        .tokenURI(id)
        .call()
        .then(res => {
          console.log(`my Token's URL : ${res}`);
          return Promise.resolve(res);
        });
      console.log(`uri : ${uri}`);
      return Promise.resolve(uri);
    }
    function _viewTokens(addr) {
      Voting.methods
        .viewMyTokens(addr)
        .call()
        .then(async res => {
          console.log(`viewTokens 함수 결과 : ${res}`);
          len = res.length;
          $(`#myTokens`).empty();
          for (let i = 0; i < len; i++) {
            // arr = res[i];
            myTokenId = res[i]._tokenId; //토큰 ID
            metadataUri = "https://ipfs.io/ipfs/"; //nft 메타데이터 주소

            metadataUri += await _tokenURI(myTokenId);
            metadataUri += "/metadata.json";
            console.log(metadataUri);
            imageUri = "https://ipfs.io/ipfs/"; //내 nft 이미지 주소

            ddd = $.ajax({
              url: metadataUri,
              type: "GET",
              async: false,
              // dataType: "jsonp",
              success: function (res) {
                image_uri = res.image.split("//")[1];
                // image_uri =
                console.log(`ajax : ${res}`);
                console.log(`nft name : ${res.name}`);
                console.log(`nft description : ${res.description}`);
                console.log(`nft external_url : ${res.external_url}`);
                console.log(`nft attributes : ${res.attributes}`);
                console.log(`nft image : ${res.image}`);
                imageUri += image_uri;
              },
              error: function (err) {
                console.log(`err : ${err}`);
              },
            });
            myTokenUri = await _tokenURI(myTokenId);

            $(`#myTokens`).append(
              `<figure>
          <img id="${myTokenId}" class="tokens" src="${imageUri}" alt="null"
          height="200" width="200">
          <figcaption>토큰 Id = ${myTokenId}</figcaption>
        </figure>
          `
            );
            $(`.tokens`).css({
              padding: "10px",
            });
          }
        });
    }

    async function _viewMyTokens() {
      open("./token.html", "_self");
      //내 토큰 확인하기
      console.log(`Voting.address : ${account}`);
      _viewTokens(account);
    }
    function _receipt() {
      // console.log(`re`);
      // web3.eth.getTransactionReceipt(tx, (err, res) => {
      //   console.log(`receipt!`);
      //   console.log(res);
      //   console.log(err);
      // });
    }
    function _mintNFT() {
      //민팅 함수.
      console.log(`_mintNFT함수 내부 : ${account}`);
      if (!checkLoginMetaMask()) return;
      let metadata = sessionStorage.getItem("metadata");

      console.log("mint!");
      url = mint_url.value;
      address = "";
      Voting.methods
        .mintNFT(account, metadata)
        .send({ from: account })
        .then(function (res) {
          console.log(`_mintNFT함수 결과 :`);
          console.log(res);
          tx = res.transactionHash;
          //민팅후 세션 초기화.
          sessionStorage.removeItem("metadata");
        });
    }
    function _getTokenBalance() {
      addr = document.getElementById("contract_addr").value;
      Voting.methods
        .balanceOf(addr)
        .call()
        .then(res => {
          token_balance = document.getElementById("token_balance");
          $("#token_balance").text(res);
        });
    }
  });
});
