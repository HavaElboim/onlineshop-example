/*********************************************************/
/*                                                       */ 
/*    Shopping Cart page for regular user (Customer)     */
/*                                                       */
/*********************************************************/

import { React,  useContext } from "react";
import { Link } from "react-router-dom";

import "./ShoppingCartPage.css";
import ThemeContext, { themes } from "../../contexts/ThemeContexts";
import "../../components/storagetools/LocalStorageArrayTools.js";
import saleIcon from "../../components/icons/green-leaf-sale-icon.png";
import LeavesFrame from "../../components/icons/green-leaves-left-frame-1.svg";
import CartItem from "../../components/CartItem/CartItem";
import "../../components/CartDisplayContents/CartDisplayContents.css";

// custom hook for updating state from local storage
import createPersistedState from "use-persisted-state";
const useCartState = createPersistedState("cart");

const ShoppingCartPage = ({numInCart, setNumInCart}) => {
        const { theme } = useContext(ThemeContext);
        //const cartItemsArray = JSON.parse(localStorage.getItem("cartArray"));
        const [cart] = useCartState({});
        
        return (
          <div className="PaymentListContents">
            {cart.length > 0 && (
              <div
                className="shoppingList"
                style={{
                  color: theme.listColor,
                }}
              >
               <div className="shoppingListTitle">In your shopping cart:</div>
      
                {cart.map((item, i) => (
                  <CartItem item={item} key={i} numInCart={numInCart} setNumInCart={setNumInCart}/>
                ))}
                {/*Use the toFixed() method in JavaScript to format a number with two decimals. */}
               <div className="TotalRow"><span className="shoppingListTitle">Total:</span> ${cart.reduce((accumulator, current) => accumulator + (current.saleReductionPercent > 0 ? current.quantity*(100-current.saleReductionPercent)*current.price/100 : current.quantity*current.price), 0).toFixed(2)}</div>
               <Link to={`/Payment`} className="PayButton">Proceed to Payment</Link>

              </div>
                
            )}
            
          </div>
        );
      };
      
      export default ShoppingCartPage;