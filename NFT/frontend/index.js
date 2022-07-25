console.log(window.ethereum);

var account;
var VotingContract;
var Voting;
var userAddress;

window.addEventListener("load", async function () {
  let { abi } = await import("./abi.js");
  let { contract } = await import("./contractAddress.js");
  console.log(abi);
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
    VotingContract = new web3.eth.Contract(abi, contract);

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
    // mint_url = document.getElementById("mint_url");
    // mint_receipt = document.getElementById("receipt");
    // mint_receipt = addEventListener("click", _receipt);

    mint_button = document.getElementById("mint_button");
    mint_button.addEventListener("click", _mintNFT);

    viewMyToken = document.getElementById("viewMyToken");
    viewMyToken.addEventListener("click", _viewMyTokens);

    // getTokenBalance = document.getElementById("getTokenBalance");
    // getTokenBalance.addEventListener("click", _getTokenBalance);

    async function _viewMyTokens() {
      open("./token.html", "_self");
      //내 토큰 확인하기
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
      let status = sessionStorage.getItem("status");
      if (!status) {
        alert("metadata json 아직 생성 안됨.");
        return;
      }
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
          sessionStorage.setItem("status", false);
        });
    }
  });
});
