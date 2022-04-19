const visitCouner = artifacts.require("VisitCounter");

module.exports = function(deployer){
    deployer.deploy(visitCouner);
}