import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x3F72C68Fc273b2D55706dfcdf45584892988E2DA');

export default instance;
