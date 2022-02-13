import Web3 from 'web3';
let web3 = new Web3(Web3.givenProvider || "https://speedy-nodes-nyc.moralis.io/7ce69af8c67a5c54f3533468/polygon/mumbai")

export default web3;