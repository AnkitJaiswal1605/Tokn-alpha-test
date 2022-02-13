import React from "react";
import { Route, Switch } from "react-router-dom";
import twitter from "./Components/twitter.png";
import telegram from "./Components/telegram.png";
import instagram from "./Components/instagram.png";
import ComingSoon from "./Components/ComingSoon.jsx";
import Metamask from "./Components/Metamask.jsx";
import Login from "./Components/Login.jsx";
import CreateAccount from "./Components/CreateAccount.jsx";
import BuyNow from "./Components/BuyNow.jsx";
import Congrats from "./Components/Congrats.jsx";
import MetamaskLogin from "./Components/MetamaskLogin.jsx";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  // window.onunload = () => {
  //   // Clear the local storage
  //   window.localStorage.clear();
  // };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="AppMain">
          <div className="background"></div>
          <a href="https://twitter.com/toknmusicapp" target='_blank'>
            <img src={twitter} className="twitter" alt="twitter" />
          </a>
          <a href="https://t.me/toknmusic" target='_blank'>
            <img src={telegram} className="telegram" alt="telegram" />
          </a>
          <a href="https://www.instagram.com/toknmusicapp/?hl=en" target='_blank'>
            <img src={instagram} className="instagram" alt="instagram" />
          </a>
          <Switch>
            <Route path="/" exact component={() => <ComingSoon />} />
            <Route path="/metamask" exact component={() => <Metamask />} />
            <Route
              path="/metamask-login"
              exact
              component={() => <MetamaskLogin />}
            />
            <Route path="/login" exact component={() => <Login />} />
            <Route
              path="/create-account"
              exact
              component={() => <CreateAccount />}
            />
            <Route path="/buy-now" exact component={() => <BuyNow />} />
            <Route path="/congrats" exact component={() => <Congrats />} />
          </Switch>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
