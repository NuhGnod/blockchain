window.addEventListener("load", async function () {
  console.log("ASD");
  let { abi } = await import("./abi.js");
  console.log(abi);

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

    console.log(Web3);
  }
  $(async function () {
    // load metamask account
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
    //네트워크 확인
    let netID = await window.ethereum.request({
      method: "eth_chainId",
    });
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
    //컨트랙트 연결.
    nftContract = new web3.eth.Contract(
      abi,
      "0xC7b2bBcDf784AC8b80Eb654BdE27CB9D7ce5faB2"
    );
    console.log(nftContract);
  });
});
