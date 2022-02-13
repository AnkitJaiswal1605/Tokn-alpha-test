import { abi } from "./build/ToknITO.json";
import web3 from "./web3.jsx";
const address = "0x8FBBf3D5F349dC8b18a18Fa0345c2bf95a7b2c80";

const contract = new web3.eth.Contract(abi, address);
export default contract;
