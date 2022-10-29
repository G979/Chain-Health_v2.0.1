const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
 
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");
 
let accounts;
let factory;
let campaignAddress;
let campaign;
 
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
 
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1400000" });
 
  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });
 
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});
 
describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the campaign coa", async () => {
    const manager = await campaign.methods.coa().call();
    assert.equal(accounts[0], manager);
  });
 
  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
 
  it("allows a manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("John's Wick MRI Test Results", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    const request = await campaign.methods.requests(0).call();
 
    assert.equal("John's Wick MRI Test Results", request.description);
  });
});
