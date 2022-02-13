import { Link } from "react-router-dom";
import metamask from './metamask.png';
import {useSelector, useDispatch} from "react-redux"
import {connectWallet, disconnectWallet} from "../redux";
import web3 from '../web3.jsx'
import '../App.css';

function Metamask() {
  const dispatch = useDispatch()
  const {error, address} = useSelector((state) => state.wallet)

  // const connect = async (event) => {
  //   event.preventDefault()
  //   dispatch(connectWallet(web3))
  //   if(error){
  //     alert(error)
  //   }
  // }
  return (
    <div className="App">
      {address ? (
        <div>
          <h1 className="connect-wallet">Disconnect Wallet</h1>
          <img src={metamask} alt="Metamask logo" class="metamask-img" />
          <button type="button" name="button" class="btn-primary metamask-btn" onClick={() => dispatch(disconnectWallet(web3))}>Disconnect</button>
          <div className="ethAccount">Account: {address}</div>
          <Link to="/login"><div className="next">Next Page</div></Link>
        </div>
      ) : (
        <div>
          <h1 className="connect-wallet">Connect Wallet</h1>
          <img src={metamask} alt="Metamask logo" class="metamask-img" />
          <button type="button" name="button" class="btn-primary metamask-btn" onClick={() => dispatch(connectWallet(web3))}>Metamask</button>
        </div>
      )}
      <p className="copyright">Copyright @ 2022 Tokn, Inc.</p>  
       
    </div>
  );
}

export default Metamask;
