const VisitCounter = artifacts.require("VisitCounter");

module.exports = function(deployer) {
  deployer.deploy(VisitCounter);
};
