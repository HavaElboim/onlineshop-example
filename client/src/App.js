/* to start running this app in localhost, type
npm start dev
in terminal from within client directory
and in a separate terminal type same from within server directory
gocodeshop-server
*/

import "./App.css";
import { useState, useEffect } from "react";

//for SPAP:
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from "react-router-dom";

//imports of pages definitions
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Admin from "./pages/Admin/Admin";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import DisplayUser from "./components/DisplayUser/DisplayUser";
import ChangeThemeColors from "./components/ChangeThemeColors/ChangeThemeColors";
import Login from "./components/Login/Login";

//contexts
import ThemeContext, { themes } from "./contexts/ThemeContexts";
import {UserContext, users } from "./contexts/UserContexts";
import SaleContext, { sales } from "./contexts/SaleContexts";
//user login contexts
import { UserStateProvider, useUserDispatch, useUserState } from "./contexts/UserContexts";
import { getUser } from "./contexts/ActionUserContexts";

import FlowerHeadSVG from "./components/icons/SpringFlowerWithGrassArtHeading.png";
import FlowerBaseSVG from "./components/icons/SpringFlowerWithGrassArtBackground.png";

/* App calls ProductsContainerClass
  which calls SaleCountdown
  which calls Products
  which calls ListCategories, and also calls ProductDisplayClass.
  ProductDisplayClass renders each product seperately in a product card.
  Products maps the array containing the shop information into separate items each containing info of one product.

Header calls SaleCountdown component which counts the time until end of sale and sets the Sale Message in the Header
Header also calls CategorySelect component to choose products filter. 
  */

//see here for example of changing theme:
// https://stackoverflow.com/questions/54738681/how-to-change-context-value-while-using-react-hook-of-usecontext

const App = () => {
  const [theme, setTheme] = useState(themes.light);
  const [user, setUser] = useState(users.guest);
  const [sale, setSale] = useState(sales.endOfYearSale);
  const [numInCart, setNumInCart] = useState(0);

  function toggleTheme() {
    setTheme((theme) => (theme === themes.light ? themes.dark : themes.light));
  }

  function toggleUser() {
    console.log("request to change user");
    setUser((user) => (user === users.guest ? users.admin : users.guest));
    console.log("logged in as user ", user.name);
  }

  function switchSale(specialOffer) {
    console.log("set sale to ", sales.name);
    setSale((sale) => sale === sales.endOfYearSale);
  }

  
    const userState = useUserState();
    const userDispatch = useUserDispatch();

    console.log("userState is: ", userState);
    
    // useEffect(() => {
    //   if (userState.user == null) {
    //     if (!localStorage.getItem("currentUser")) return;
    //     getUser(userDispatch);
    //   }
    // }, [userDispatch]);

  return (
    <UserStateProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <UserContext.Provider value={{ user, toggleUser }}>
          <SaleContext.Provider value={{ sale, switchSale }}>
            <Router>
              <div
                className="outer-div"
                style={{ color: theme.foreground, background: theme.background }}
              >
                <img src={FlowerHeadSVG} className="imgBottom" alt="Garden shop"/>
                <div className="inner-outer-div">
                <ChangeThemeColors />
                {/* <DisplayUser /> */}
                <nav>
                  <ul>
                    <li>
                      <Link to="/Home">Home</Link>
                    </li>
                    <li>
                      <Link to="/About">About</Link>
                    </li>
                    {user.name === "Admin" && (
                    <li>
                      <Link to="/Admin">Admin - add new product</Link>
                    </li>
                  )}
                </ul>
              </nav>

              {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
         {/* {userState.user && (*/}
              <Switch>
                <Route path="/Admin">
                  <Admin />
                </Route>
                <Route exact path="/Home">
                  <Home />
                </Route>
                <Route path="/About">
                  <About />
                </Route>
                <Route path="/products/:_id" component={ProductInfo}></Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            {/*}  )} */}
              <Switch>
              <Route path="/login">
          {/* {!userState.user ? (
            <Login />
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )} */}
        </Route>
        <Route path="/register">
          {/* {!userState.user ? (
            <Login />
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )} */}
        </Route>
        {/* <Route path="/">
          {userState.user ? <Home /> : <Redirect to={{ pathname: "/login" }} />}
        </Route> */}
      </Switch>
              </div>
                <img src={FlowerBaseSVG} className="imgBottom" alt="flower decoration"/>
              </div>
            </Router>
          </SaleContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </UserStateProvider>
  );
};

export default App;
