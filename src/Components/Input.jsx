import { Link } from "react-router-dom";
import '../App.css';

function Input() {
  return (
    <div className="App">
        <div className="white-container wc-input">
            <Link to="/"><p className="cross">+</p></Link>
            <br />
            <h4 className="input-code">Input Code</h4>
            <br />
            <input className="code-box" type="text" name="" placeholder="" />
            <input className="code-box" type="text" name="" placeholder="" />
            <input className="code-box" type="text" name="" placeholder="" />
            <p className="hyphen">---</p>
            <input className="code-box" type="text" name="" placeholder="" />
            <input className="code-box" type="text" name="" placeholder="" />
            <input className="code-box" type="text" name="" placeholder="" />
            <br />
            <Link to="create-account"><button type="button" name="button" class="btn-primary cta">
                Create Account
            </button></Link>
        </div>
    </div>
  );
}

export default Input;
