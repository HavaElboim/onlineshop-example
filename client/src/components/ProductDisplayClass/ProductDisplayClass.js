import React, { useContext } from "react";
import "./ProductDisplayClass.css";
import PropTypes from "prop-types";
import sale from "./sale.png";
//import { Link } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductInfo from "../../pages/ProductInfo/ProductInfo";
import ThemeContext from "../../contexts/ThemeContexts";

/* this component is called from the Products class.
   It renders individual products cards (product title, image, price).
   If the product is a sale item, its title and sale price are colored until the sale ends 
   */

const ProductDisplayClass = (props) => {
  const {
    color,
    secondsLeft,
    salesProductsIds,
    selectedCategory,
    title,
    image,
    price,
    productid,
    category,
    isSale,
    priceRange,
  } = props;

  const theme = useContext(ThemeContext);

  const newPrice = salesProductsIds.includes(productid)
    ? ` Sale: $ ${+(price * 0.9).toFixed(2)}`
    : "";

  /* renders an individual product card, containing product information and image.
  the information an image are obtained from the props which are passed from the ProductsContainerClass */

  return (
    (!selectedCategory || category === selectedCategory) &&
    price < priceRange[1] &&
    price > priceRange[0] && (
      <div
        className="product-card"
        style={{ color: theme.foreground, background: "white" }}
      >
        <div className="product-info">
          {newPrice && isSale ? <img src={sale} alt="sale item"></img> : null}
          <h6
            style={{
              color: newPrice && isSale ? color : "black",
            }}
          >
            {title}
          </h6>
        </div>
        <div className="product-image">
          <img src={image} alt={""} />
        </div>
        <div className="product-info">
          <h5>$ {price}</h5>
          <h5
            style={{
              color: color,
              display: newPrice && secondsLeft ? "block" : "none",
            }}
          >
            {newPrice}
          </h5>
        </div>
      </div>
    )
  );
};

ProductDisplayClass.propTypes = {
  secondsLeft: PropTypes.number,
  color: PropTypes.string,
  price: PropTypes.number,
  selectedCategory: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  salesProductsIds: PropTypes.arrayOf(PropTypes.number),
  category: PropTypes.string,
};

export default ProductDisplayClass;

/*
return (
    (!selectedCategory || category === selectedCategory) && (
      <div className="product-card">
        <Link to={`/ProductInfo/${productid}`}>
          <ProductInfo
            id={productid}
            price={price}
            image={image}
            title={title}
            isSale={secondsLeft}
            newPrice={newPrice ? newPrice : ""}
          />
        </Link>
        <div className="product-info">
          {newPrice && secondsLeft ? (
            <img src={sale} alt="sale item"></img>
          ) : null}
          <h6
            style={{
              color: newPrice && secondsLeft ? color : "black",
            }}
          >
            {title}
          </h6>
        </div>
        <div className="product-image">
          <img src={image} alt={""} />
        </div>
        <div className="product-info">
          <h5>$ {price}</h5>
          <h5
            style={{
              color: color,
              display: newPrice && secondsLeft ? "block" : "none",
            }}
          >
            {newPrice}
          </h5>
        </div>
      </div>
    )
  );
  */

/*
import { Link } from "react-router-dom";
import AddTodo from "../../components/AddTodo/AddTodo";
import Todo from "../../components/Todo/Todo";

const Home = () => {
    const [todos, setTodos] = useState([]);
    // const check = useRef("Hello");
  
    // let check = "Hello";
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => setTodos(data));
    }, []);
  
    const addTodo = (title) => {
      const newTodo = {
        id: todos.length + 1,
        title,
        userId: 0,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
    };
  
    return (
      <>
        <AddTodo onAdd={addTodo} />
        {todos.map((todo) => (
          <Link to={`/todos/${todo.id}`} key={todo.id}>
            <Todo id={todo.id} title={todo.title} />
          </Link>
        ))}
      </>
    );
  };
  
  */
