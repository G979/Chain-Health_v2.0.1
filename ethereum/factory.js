import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x0064583A71D9135Dda55584377926C519dd440DC');

export default instance;
