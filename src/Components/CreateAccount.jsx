import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import metamask from './metamask.png';
import tick from './tick.png';
import { signup } from "../redux";
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function CreateAccount() {

  const [validEmail, setValidEmail] = useState(true);
  const [validPass, setValidPass] = useState(true)
  const [match, setMatch] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirm_password] = useState("")
  const [username, setUsername] = useState("")
  const [terms, setTerms] = useState(false);
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [term3, setTerm3] = useState(false);
  const [term4, setTerm4] = useState(false);

  var upperCaseLetters = /[A-Z]/g;
  var lowerCaseLetters = /[a-z]/g;
  var numbers = /[0-9]/g;

  const dispatch = useDispatch();
  const address = useSelector((state) => state.wallet.address)
  const {error, loggedIn} = useSelector((state) => state.user)
  

 useEffect(() => {
    if(loggedIn){
      
      window.location = "/buy-now"
    }
  }, [])

  const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  // const validatePassword = (password) => {
  //   return String(password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  // }

  const handleEmailChange = (event) => {
    if(validateEmail(event.target.value)){
      setEmail(event.target.value) 
      setValidEmail(true)
    }else{
      setValidEmail(false)
    }
  }

  const handlePasswordChange = (e) => {
    setTerms(true);
    
    if(e.target.value.length >= 6) {
      setTerm1(true);
    }else{
      setTerm1(false)
    }

    if(e.target.value.match(upperCaseLetters)) {
      setTerm2(true);
    }else{
      setTerm2(false)
    }

    if(e.target.value.match(lowerCaseLetters)) {
      setTerm3(true);
    }else{
      setTerm3(false)
    }

    if(e.target.value.match(numbers)) {
      setTerm4(true);
    }else{
      setTerm4(false)
    }

    if(e.target.value === "") {
      setTerms(false);
    }
    setPassword(e.target.value)
    if(term1 && term2 && term3 && term4){
      setValidPass(true)
    }else{
      setValidPass(false)
    }
    // if(validatePassword(event.target.value)){
    //    setPassword(event.target.value) 
    //   setValidPass(true)
    // }else{
    //   setPassword(event.target.value) 
    //   setValidPass(false)
    // }
    
  }

  const matchPasswords = (event) => {
   
    if(password === event.target.value){
      setConfirm_password(event.target.value) 
 
      setMatch(true)
    }else{
    
      
      setMatch(false)
    }
  }

  const register = (event) => {
    event.preventDefault()
    if(!address){
      alert("Connect wallet first.");
      window.location = "/metamask"
    }else{
      console.log(validEmail, " ", validPass, " ", match);
       if(validEmail && validPass && match){
      
      let user = {
        username,
        email,
        password,
        confirm_password,
        walletAddress: address
      }
      dispatch(signup(user))
      // window.location = "/buy-now"
      
    
    }else{
      alert("Please fill all the fields properly.")
    }
    }
    
    
   
    
  }
  return (
    <div className="App">
        <div className="white-container">
            <h4 className="create">Create an Account</h4>
            <p className="login-label">Username</p>
            <input className="pwd-input" type="text" name="" placeholder="Toknmusic" onChange={(event) => {setUsername(event.target.value) }}/>
            <p className="login-label">Email</p>
            <input type="text" name="" placeholder="email@email.com" onChange={handleEmailChange}/>
            {validEmail ? null: <p className="valid-email-pass">Please enter a valid email</p>}
            <p className="login-label">Password</p>
            <input className="pwd-input" type="password" name="" placeholder="Password" onChange={handlePasswordChange}/>
            {terms && <div className="pswd-terms">
              {!term1 && <p className="pswd-red">Must contain at least 6 characters</p>}
              {term1 && <p className="pswd-green">Must contain at least 6 characters</p>}
              {!term2 && <p className="pswd-red">Must contain an uppercase alphabet</p>}
              {term2 && <p className="pswd-green">Must contain an uppercase alphabet</p>}
              {!term3 && <p className="pswd-red">Must contain a lowercase alphabet</p>}
              {term3 && <p className="pswd-green">Must contain a lowercase alphabet</p>}
              {!term4 && <p className="pswd-red">Must contain a number</p>}
              {term4 && <p className="pswd-green">Must contain a number</p>}
            </div>}
            <p className="login-label">Confirm Password</p>
            <input type="password" name="" placeholder="Confirm Password" onChange={matchPasswords}/>
            {match ? null: <p className="valid-email-pass valid-email-pass2">Passwords do not match</p>}
            <br />
            <br />
            <button type="button" name="button" class="btn-primary confirm" onClick={register}>
                Confirm
            </button>
            <Link to='/login'><p className="sign-in">Already have an account? Sign in</p></Link>
            <p className="copyright">Copyright @ 2022 Tokn, Inc.</p>
        </div>
    </div>
    
  );
}

export default CreateAccount;
