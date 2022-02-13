import { abi } from "./build/ToknFactory.json";
import web3 from "./web3.jsx";
const address = "0xaB7364aE435F413e034B0Ab37633B3902BBC02E1";

const factory = new web3.eth.Contract(abi, address);
export default factory;
