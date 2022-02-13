import { abi } from "./build/UsdcToken.json";
import web3 from "./web3.jsx";
const address = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b";
const usdc = new web3.eth.Contract(abi, address);
export default usdc;
