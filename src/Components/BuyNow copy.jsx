import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../App.css';
import contract from "../ToknContract";
import usdc from "../usdcContract";
import { updateBalance } from "../redux";
import songPoster from './song-poster.jpg';
import artistImg from './NC-img.png';

function BuyNow() {

  const [qty, setQty] = useState(0)
  const [ryl, setRyl] = useState(0)
  const [amount, setAmount] = useState(0)
  const [toknsAvailable, setToknsAvailable] = useState(0)
  const [price, setPrice] = useState(0)
  const [errmess,setErrmess] = useState(null)
  const {address, error, balance} = useSelector((state) => state.wallet)
  const {loggedIn} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
     async function getToknDetails(){
      const toknITO = await contract.methods.getITO('1').call();
      const tokns = toknITO.toknsAvailable;

      const toknPrice = toknITO.price;
      setPrice(toknPrice)
      setToknsAvailable(tokns)
    }
    getToknDetails()
  }, [balance])
  

  window.onload = async (e) => {
    if(address){
    dispatch(updateBalance(address, 1))
    }else if (!loggedIn){
      alert("User not loggedIn.")
      window.location = "/create-account"
    }else{
      alert("Connect wallet first.");
      window.location = "/metamask"
    }
    
    

  }
  function handleChange(event) {
    event.preventDefault()
    setQty(event.target.value * 1)
    setRyl(event.target.value * 0.1)
    setAmount(event.target.value * price/1000000)
    setErrmess(null)
    console.log(typeof event.target.value)
    console.log(typeof toknsAvailable);
    if (Number(event.target.value) > Number(toknsAvailable)) {
      console.log(toknsAvailable, "&", event.target.value);
     setErrmess("Amount exceeds available tokens"); 
    }
    if (event.target.value < 1 || event.target.value%1 !==0) {
     setErrmess("Please enter valid amount"); 
    }
  }

  const buyTokns = async (event) => {
    event.preventDefault()
    if(errmess){
      alert(errmess)
    }else{
      try{
      console.log("processing...");
      
      await usdc.methods.approve(contract._address, qty*price).send({from: address})
      console.log("approved");
    await contract.methods.investFixedPrice(1, qty).send({from: address})
    console.log("Tokens bought: ", qty);
    dispatch(updateBalance(address, 1))
    
    if(error){
      console.log("Error in if");
      alert(error)
    }
    window.location = "/congrats"
    }catch(error){
      console.log("Error in catch");
      alert(error)
    }
    }
    

  }

  function tooltip() {
    document.querySelector('.tooltip1').style.display = 'inline-block';
  }

  function tooltipNone() {
    document.querySelector('.tooltip1').style.display = 'none';
  }

  function popup() {
    document.querySelector('.popup-wrapper').style.display = 'flex';
  }

  function popout() {
    document.querySelector('.popup-wrapper').style.display = 'none';
  }

  return (
    <div className="App buy-now-wrap">
      <div className="wallet-wrap">
        <p className="wallet-address">Active Wallet: <span id="address">{address}</span></p>
        <p className="balance">Tokns Booked: <span id="bal">{balance}</span></p>
      </div>
        
        <div className="white-container2">
            <span className="info" onMouseOver={tooltip} onMouseOut={tooltipNone}>
              i <span className="tooltip1">Book the first ever FSTs by preordering.
               When beta goes live, tokn-holders will receive their FSTs and begin earning royalties.</span>
            </span>
            <span className="tooltip1">Book the first ever FSTs by preordering.<br/> When beta goes live, tokn-holders will <br/>receive their FSTs and begin earning royalties.</span>
            <span className="song-img">
              <img src={songPoster} alt='song-poster' className="song-poster" />
            </span>
            <span className="song-info">
                <h1>On My Own</h1>
                <h5><img src={artistImg} alt='NC' className="artist-img" />NC</h5>
            </span>   
            <div className="white-container-inner">
                <p className="qty">Quantity</p>
                <input className="qty-input" id="quantity" type="number" placeholder="---" min="0" step="1" max="100" onChange={handleChange} />
                {errmess ? <p style={{color: 'red'}}>{errmess}</p>: null}
                <br />
                <span className="left">Tokns Available</span>
                <span className="right">{toknsAvailable}</span>
                <br />
                <hr />
                <span className="left">Royalties</span>
                <span className="right">{ryl} %</span>
                <br />
                <hr />
                <span className="left">Quantity</span>
                <span className="right">{qty} Tokns</span>
                <br />
                <hr />
                <span className="left">Total Price</span>
                <span className="right">{amount} USDC</span>
                <br />
                <br />
                <br />
                {/* <Link to="/congrats"> */}
                <button type="button" name="button" className="btn-primary buy-now-btn" id="buy-now" onClick={popup}>
                    Book Now
                </button>
                <div className="popup-wrapper">
                  <div className="popup">
                    <div className="popup-close" onClick={popout}>+</div>
                    <div className="popup-content">
                      <button type="button" name="button" class="btn-primary buy-now-btn popup-btn pb1" id="buy-now" onClick={buyTokns}>
                        Pay now with USDC
                      </button>
                      <br />
                      <br />
                      <Link to="/congrats">
                      <button type="button" name="button" class="btn-primary buy-now-btn popup-btn" id="buy-now">
                        Have already paid
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
            </div>          
        </div>
    </div>
  );
}

export default BuyNow;
