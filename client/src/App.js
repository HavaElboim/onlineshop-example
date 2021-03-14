import "./App.css";
import { useState } from "react";

//for SPAP:
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//imports of pages definitions
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Admin from "./pages/Admin/Admin";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import DisplayUser from "./components/DisplayUser/DisplayUser";
import ChangeThemeColors from "./components/ChangeThemeColors/ChangeThemeColors";

// for theme context:
import ThemeContext, { themes } from "./contexts/ThemeContexts";
import UserContext, { users } from "./contexts/UserContexts";

//import "./utils";

//const salesProductsIds = [1, 3, 5, 6];
// import './App.css';

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

  function toggleTheme() {
    setTheme((theme) => (theme === themes.light ? themes.dark : themes.light));
  }

  function toggleUser() {
    console.log("request to change user");
    setUser((user) => (user === users.guest ? users.admin : users.guest));
    console.log("logged in as user ", user.name);
  }

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <UserContext.Provider value={[user, toggleUser]}>
        <ChangeThemeColors />
        <DisplayUser />
        <Router>
          <div
            className="outer-div"
            style={{ color: theme.foreground, background: theme.background }}
          >
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
                    <Link to="/Admin">Admin</Link>
                  </li>
                )}
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
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
          </div>
        </Router>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
//<Route path="/products/:product.id" component={ProductInfo}></Route>

/*<Route path="/products/:product.id">
            <ProductInfo />
          </Route>*/

/*
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import TodoDetails from "./pages/TodoPage/TodoPage";


const App = () => {
  return (
    <Router>
      <div>
       <nav>
          <ul>
            <li>
              <Link to="/Home">Home2</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/products/2">prod2</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/todos/:todoId" component={TodoDetails}>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
*/
/*
version using classes:

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "red",
      secondsLeft: 15,
      price: 0,
      newPrice: "",
      salesProductsIds: [1, 3, 5, 6],
      categories: [],
      selectedCategory: "",
      products: [],
    };
  }

  listCategories = (products) => {
    this.setState({
      categories: (products) => Object.keys(groupBy(products, "category")),
    });
 
    this.setState({ categories: ["Select...", ...this.state.categories] });
  };

  render() {
    return (
      <div>
        <HeaderClass
          categories={this.state.categories}
          selectedCategory={this.state.selectedCategory}
          products={this.state.products}
          listCategories={this.listCategories}
        ></HeaderClass>
        <ProductsContainerClass
          color={this.state.color}
          secondsLeft={this.state.secondsLeft}
          price={this.state.price}
          newPrice={this.state.newPrice}
          salesProductsIds={this.state.salesProductsIds}
          selectedCategory={this.state.selectedCategory}
          listCategories={this.listCategories}
          products={this.state.products}
        >
          Some child
        </ProductsContainerClass>
      </div>
    );
  }
}
*/
