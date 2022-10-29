const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const mnemonicPhrase = "happy smoke shop soul limb sell defy fitness casino mix weather pelican";
const rinkeby_endpoint = "https://rinkeby.infura.io/v3/40fe6433ded94800b0139cbc7abeeb9c";
const healthchain_endpoint = "http://3.9.185.202:8545";

const provider = new HDWalletProvider(mnemonicPhrase, healthchain_endpoint);
const web3 = new Web3(provider);

const compiledFactory = require("./build/CampaignFactory.json");
const abi = compiledFactory.abi
const bytecode = compiledFactory.evm.bytecode.object

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({ 
      data: '0x' + bytecode,
    })
    .send({
      gas:"1400000",
      from: accounts[1],
    })
    .catch(err => console.log(err))
 
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
 
deploy();
