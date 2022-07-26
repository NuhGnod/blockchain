window.addEventListener("load", async function () {
  var HOME = this.document.getElementById("HOME");
  HOME.addEventListener("click", function () {
    open("./index.html", "_self");
  });
  var account;
  console.log("ASD");
  let { abi } = await import("./abi.js");
  let { contract } = await import("./contractAddress.js");

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
    nftContract = new web3.eth.Contract(abi, contract);
    console.log(nftContract);
    //
    //
    //
    let getToken = document.getElementById("getToken");
    getToken.addEventListener("click", _getToken);
    let getTokenBalance = document.getElementById("getTokenBalance");
    getTokenBalance.addEventListener("click", _getTokenBalance);
    let transfer = document.getElementById("transfer");
    transfer.addEventListener("click", _transfer);

    function _transfer() {
      let targetAddress = document.getElementById("targetAddress").value;
      let targetTokenId = document.getElementById("targetTokenId").value;
      console.log(targetAddress);
      console.log(account);
      nftContract.methods
        .safeTransferFrom(account, targetAddress, targetTokenId)
        .send({ from: account })
        .then(function (res) {
          console.log(res);
        });
    }
    function _getTokenBalance() {
      nftContract.methods
        .balanceOf(account)
        .call()
        .then(res => {
          console.log(res);
          $(`#token_balance`).text(res);
        });
    }
    async function _tokenURI(id) {
      //token id 값으로 토큰의 메타데이터 주소 리턴.
      uri = await nftContract.methods
        .tokenURI(id)
        .call()
        .then(res => {
          console.log(`my Token's URL : ${res}`);
          return Promise.resolve(res);
        });
      console.log(`uri : ${uri}`);
      return Promise.resolve(uri);
    }
    async function _getToken() {
      console.log(`function _getToken`);
      var totalTokenCount;
      let qwe = await nftContract.methods
        .viewTotalTokenBalance()
        .call()
        .then(res => {
          totalTokenCount = res;
          //   console.log(res);
          return res;
        });
      console.log(totalTokenCount);
      $(`#tokenList`).empty();

      for (let i = 1; i <= totalTokenCount; i++) {
        console.log(`i : ${i}`);
        nftContract.methods
          .ownerOf(i)
          .call()
          .then(async res => {
            console.log(res);
            if (res == account) {
              // i 값에 해당하는 토큰의 owner가 현재 account이다.
              myTokenId = i; //토큰 ID
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
              // myTokenUri = await _tokenURI(myTokenId);

              $(`#tokenList`).append(
                `<figure>
                  <img id="${myTokenId}" class="tokens" src="${imageUri}" alt="null"
                  height="200" width="200">
                  <figcaption>토큰 Id = ${i}</figcaption>
                </figure>
                  `
              );
              $(`.tokens`).css({
                border: "1px solid black",
                padding: "10px",
              });
            }
          });
      }
    }
  });
});
