import { Link} from "react-router-dom";
import logo from './logo.png';
import '../App.css';

function ComingSoon() {
  return (
    <div className="App">
      <img src={logo} className="logo" alt="logo" />
      <h4 className="coming">Coming soon...</h4>
      {/* <Link to="/metamask"> */}
      <button type="button" name="button" class="btn-primary early-access" onClick={() => window.location = "/metamask"}>
        Early Access
      </button>
      {/* </Link> */}
      <Link to="/login"><p className="login-link">Login</p></Link>
      <p className="copyright">Copyright @ 2022 Tokn, Inc.</p>
    </div>
  );
}

export default ComingSoon;
