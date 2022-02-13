import { Link } from "react-router-dom";
import metamask from './metamask.png';
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux";
import { useEffect, useState } from "react";

function Login() {
  const address = useSelector((state) => state.wallet.address)
  const {error, loggedIn} = useSelector((state) => state.user)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

   useEffect(() => {
    if(loggedIn){
      
      window.location = "/buy-now"
    }
  }, [])
  const userLogin = async (event) => {
    event.preventDefault()
    if(!address){
      alert("Connect wallet first!");
      window.location = "/metamask-login"
    }
    else{
      let user = {
      email,
      password,
      walletAddress: address
    }
    dispatch(login(user))
    }
    
    
    
  }
  
  return (
    <div className="App">
        <div className="white-container wcLogin">
            <h4 className="create">Login</h4>
            <p className="login-label">Username or Email</p>
            <input type="text" name="" placeholder="email@email.com" onChange={(event) => {setEmail(event.target.value)}}/>
            <p className="login-label">Password</p>
            <input className="pwd-input" type="password" name="" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>
            <br />
            <br />
            
              <button type="button" name="button" class="btn-primary confirm login-btn" onClick={userLogin}>
                Login
              </button>
              <Link to='/create-account'><p className="sign-up">New User? Sign up</p></Link>
              <p className="copyright-login">Copyright @ 2022 Tokn, Inc.</p>
        </div>
    </div>
  );
}

export default Login;
