/* to start running this app in localhost, type
npm start
in terminal from within client directory
and in a separate terminal type "node index.js" from within server directory
gocodeshop-server
*/

import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//for SPAP:
//import { BrowserRouter as Router, Switch,  Route, Link } from "react-router-dom";
import { Router, Switch,  Route, Link } from "react-router-dom";

//bootstrap for design tools such as a spinner on loading:
import "bootstrap/dist/css/bootstrap.min.css"; 

//imports of pages definitions
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Admin from "./pages/Admin/Admin";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import ProductInfoAdmin from "./pages/ProductInfo/ProductInfoAdmin";
import ProductInfoPublicAdmin from "./pages/ProductInfo/ProductInfoPublicAdmin";

import DisplayUser from "./components/DisplayUser/DisplayUser";
import ChangeThemeColors from "./components/ChangeThemeColors/ChangeThemeColors";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
//contexts
import ThemeContext, { themes } from "./contexts/ThemeContexts";
import SaleContext, { sales } from "./contexts/SaleContexts";


//login
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

import FlowerHeadSVG from "./components/icons/SpringFlowerWithGrassArtHeading.png";
import FlowerBaseSVG from "./components/icons/SpringFlowerWithGrassArtBackground.png";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";

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
  const [sale, setSale] = useState(sales.endOfYearSale);

  //const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log("role of logged-in user: ", currentUser.role);
      switch(currentUser.role) {
        case "admin": { 
          console.log("Logged in as Admin");
        // setShowAdminBoard(currentUser.role === ("ROLE_ADMIN"));
        }
        case "testadmin":{
          console.log("Logged in as Public Admin Tester");
        // setShowAdminBoard(currentUser.role === ("ROLE_PUBLIC_ADMIN"));
        }
        default: {
          console.log("Running as logged-in user");
      // setShowCustomerBoard(currentUser.role === ("ROLE_ADMIN"));
        }
      }
    }
    else  console.log("Running as regular visitor ");
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };



  function toggleTheme() {
    setTheme((theme) => (theme === themes.light ? themes.dark : themes.light));
  }

  function switchSale(specialOffer) {
    console.log("set sale to ", sales.name);
    setSale((sale) => sale === sales.endOfYearSale);
  }


  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <SaleContext.Provider value={{ sale, switchSale }}>
            <Router history={history}>
              <div
                className="outer-div"
                style={{ color: theme.foreground, background: theme.background }}
              >
                <img src={FlowerHeadSVG} className="imgBottom" alt="Garden shop"/>
                <div className="inner-outer-div">
                <ChangeThemeColors />
                <DisplayUser />
                {currentUser ? (
                  <div>
                  <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {/* {currentUser.email} */} My details
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
                ):
                (
                  <div>
                   <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
                  </div>
                )}
                <nav>
                  <ul>
                    <li>
                      <Link to="/Home">See our products</Link>
                    </li>
                    <li>
                      <Link to="/About">About</Link>
                    </li>
                    {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
                </ul>
              </nav>

              {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
              <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} /> 
                <Route path="/Admin">
                  <Admin />
                </Route>
                <Route exact path="/Home">
                  <Home />
                </Route>
                <Route path="/About">
                  <About />
                </Route>
                { currentUser && currentUser.role === ("admin") ? (
                  <Route path="/products/:_id" component={ProductInfoAdmin}></Route>
                ) : (
                    currentUser && currentUser.role === ("testadmin") ? (
                  <Route path="/products/:_id" component={ProductInfoPublicAdmin}></Route>
                ) : <Route path="/products/:_id" component={ProductInfo}></Route>
                )
              }
                <Route path="/Payment">
                  <PaymentPage />
                </Route>
                <Route path="/Cart">
                  <ShoppingCartPage/>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
              </div>
                <img src={FlowerBaseSVG} className="imgBottom" alt="flower decoration"/>
              </div>
            </Router>
          </SaleContext.Provider>
      </ThemeContext.Provider>
  );
};

export default App;

/*
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
                <DisplayUser />
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

        //      { A <Switch> looks through its children <Route>s and
        //renders the first one that matches the current URL. }
        //  {{userState.user && (}
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
      // {}  )} }
        <Switch>
        <Route path="/login">
    {!userState.user ? (
      <Login />
    ) : (
      <Redirect to={{ pathname: "/" }} />
    )}
  </Route>
  <Route path="/register">
    {!userState.user ? (
      <Login />
    ) : (
      <Redirect to={{ pathname: "/" }} />
    )}
  </Route>
  <Route path="/">
    {userState.user ? <Home /> : <Redirect to={{ pathname: "/login" }} />}
  </Route>
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
*/