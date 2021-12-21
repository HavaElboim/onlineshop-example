/*********************************************************/
/*                                                       */ 
/*    Payment page for regular user (Customer) with cart */
/*                                                       */
/*********************************************************/

import { React,  useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import ThemeContext, { themes } from "../../contexts/ThemeContexts";


// import credit card display code:
import CardReactFormContainer from 'card-react';
import "./PaymentPage.css";

//for cart contents list:
import "../../components/storagetools/LocalStorageArrayTools.js";
import CartItemPaid from "../../components/CartItemPaid/CartItemPaid";
import createPersistedState from "use-persisted-state";
const useCartState = createPersistedState("cart");

const PaymentPage = () => {
    const { theme } = useContext(ThemeContext);

    // const form = useRef(); // form for card details - values are used by the card component
    // const formAddress = useRef();  // form for shipping details
    // const counterRef = useRef(0);
    // const [submitted, setSubmitted] = useState([]);

    // const checkBtn = useRef();
    // const [loading, setLoading] = useState(false);

    const [paid, setPaid] = useState(false);
    const [formFillWarning, setFillWarning] = useState("");

    // const [shippingDetails, setShippingDetails] = useState({shippingname:"", address1:"", city:"", zip:"", country:""});
    const [address, setAddress] = useState(null);
    const [shipname, setShipname] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [zip, setZip] = useState(null);

    const [cart] = useCartState({});
    const [numInCart, setNumInCart] = useState((cart.length>0? cart.reduce((n, { quantity }) => n + quantity, 0): 0));

    let temp = "";

    const handleDummyPayment = () => {
        setFillWarning("");
        let tempFilled = true;
        /*for (var key in shippingDetails) {
            if (shippingDetails[key] === null || shippingDetails[key] === "") {
                tempFilled = false;
                setFillWarning("Information missing - fill all fields in form");
            }    
        }*/
        if (address===null || shipname===null || city===null || country === null || zip===null) {
                tempFilled = false;
                setFillWarning("Information missing - fill all fields in form"); 
        }
        if(tempFilled) {
            setFillWarning("");
            setPaid(true);
        }
        
    }

    useEffect(() => {
      console.log(
        `In payment page, form details: ${address}, ${shipname}, ${city}, ${country}, ${zip}`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, shipname, city, country, zip]);

    const clearShippingDetails = () => {
      console.log("clearing form");
        setAddress(""); setShipname(""); setCity(""); setCountry(""); setZip("");
        setAddress(null); setShipname(null); setCity(null); setCountry(null); setZip(null);
        setFillWarning("");
        console.log(`new values are: ${address}, ${shipname}, ${city}, ${zip}`);
    }

    return (
        <div>
            {paid === false ? (

                <div>
                <div className="shippingDetailsBox">
                <div className="formHeader">Shipping Address:</div>

                {/*<form  >*/}
                <label htmlFor="ShipName" title="Full name of recipient">Name</label>
                <input placeholder="Full name" type="text"  className="form-control" name="ShipName" value={shipname} onBlur={(e) => {setShipname(e.target.value); console.log("changing shipping name to ", e.target.value);} } />

                <label htmlFor="ShipAdress1" title="House number/apt, Street">Address</label>
                  {/* <input placeholder="Address" type="text" className="form-control" name="ShipAdress1" value={address1} onFocus={(e)=>console.log("focused")} onBlur={(e) =>  {console.log("change"); onChangeDetails(e);}}  /> */}
                  {/* <input placeholder="Address" type="text" className="form-control" name="ShipAdress1" value={shippingDetails.address1}   /> */}
                  <input placeholder="Address" type="text" className="form-control" name="ShipAdress1" value={address}  onBlur={(e) => {setAddress(e.target.value) } } />

                  <label htmlFor="ShipCity" >City</label>
                  <input placeholder="City" type="text"  className="form-control" name="ShipCity"  value={city}  onBlur={(e) => {setCity(e.target.value)} }/>
                  <label htmlFor="ShipZip" >Zip</label>
                  <input placeholder="Zip" type="text"  className="form-control" name="ShipZip"  value={zip} onBlur={(e) => {setZip(e.target.value)} }/>
                  <label htmlFor="ShipCountry" >Country</label>
                  <input placeholder="Country" type="text"  className="form-control" name="ShipCountry" value={country} onBlur={(e) => {setCountry(e.target.value)} }/>
                {/*</form>*/}
                <div>city: {city}</div>
                <div className="payButtonsBox">
                        <button className="PayButton" onClick={(e) => {clearShippingDetails(); }}>Clear</button>
                    </div> 

                             <CardReactFormContainer
                
                // the id of the container element where you want to render the card element.
                // the card component can be rendered anywhere (doesn't have to be in ReactCardFormContainer).
                container="card-wrapper" // required
                
                // an object contain the form inputs names.
                // every input must have a unique name prop.
                formInputsNames={
                  {
                    name: 'CCname', // optional - default "name"
                    number: 'CCnumber', // optional — default "number"
                    expiry: 'CCexpiry',// optional — default "expiry"
                    cvc: 'CCcvc' // optional — default "cvc"
                  }
                }
                
                // initial values to render in the card element
                initialValues= {
                  {
                    number: '4242424242424242', // optional — default •••• •••• •••• ••••
                    cvc: '123', // optional — default •••
                    expiry: '16/12', // optional — default ••/••
                    name: 'Random Name' // optional — default FULL NAME
                  }
                }
                
                // the class name attribute to add to the input field and the corresponding part of the card element,
                // when the input is valid/invalid.
                classes={
                  {
                    valid: 'valid-input', // optional — default 'jp-card-valid'
                    invalid: 'invalid-input' // optional — default 'jp-card-invalid'
                  }
                }


                // specify whether you want to format the form inputs or not
                formatting={true} // optional - default true
                >
                <form className="ccDetailsForm" onSubmit={handleDummyPayment} >

                  
                   
                            <div className="CardWarning">This is a demo only!</div>
                            <div className="CardWarning">Never give your real card details</div>
                
                

                <label htmlFor="CCname" title="name of cardholder">Full name</label>
                  <input placeholder="Full name" title="name of cardholder" className="form-control" type="text" name="CCname" />
                  <label htmlFor="CCnumber">Card number</label>
                  <input placeholder="Card number" type="text" className="form-control" name="CCnumber" />
                  <label htmlFor="CCexpiry" title="Month/Year (2-digits for each)">Expiry date</label>
                  <input placeholder="MM/YY" type="text" name="CCexpiry" className="form-control" title="Month/Year (2-digits for each)"/>
                  <label htmlFor="CCcvc" title="3 or 4 digit number on rear of card">CCV</label>
                  <input placeholder="CVC" type="text" name="CCcvc" className="form-control" title="3 or 4 digit number on rear of card"/>
                </form> 
                
                </CardReactFormContainer>
                <div id="card-wrapper"></div>

                {/* <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Submit</span>
                        </button>
                    </div> */}
                  
                   <div className="payButtonsBox">
                        <button className="PayButton" onClick={(e) => {handleDummyPayment(); }}>Send Payment</button>
                    </div> 
                    <div className="CardWarning">{formFillWarning}</div>  
                    <Link to={`/Home`} className="backButton">Back to Shop</Link>

                  </div>
                 
                  </div>
            
                            
            ) : (
                <div>
                    <div className="summaryBox">
                    

                    <div className="formHeader">Thank you for your order</div>
                    <div className="thankyouText">Your fictitious order has been processed from your imaginary credit card</div>
                    <div className="thankyouText"> Here are the details of the products you would have liked to order: </div>
                    <div className="formHeader">Items in order:</div>

                    {cart.length > 0 && (

              <div
                className="shoppingList"
                style={{
                  color: theme.listColor,
                }}
              >
               <div className="shoppingListTitle">In your shopping cart:</div>
                <div>
                {cart.map((item, i) => (
                  <CartItemPaid item={item} key={i} numInCart={numInCart} />
                ))}
                {/*Use the toFixed() method in JavaScript to format a number with two decimals. */}
               <div className="TotalRow"><span className="shoppingListTitle">Total:</span> ${cart.reduce((accumulator, current) => accumulator + (current.saleReductionPercent > 0 ? current.quantity*(100-current.saleReductionPercent)*current.price/100 : current.quantity*current.price), 0).toFixed(2)}</div>
                </div>
               
               </div>
                )}

                </div>
                <div className="shippingDetailsBox">
                <div className="formHeader">Shipping To:</div>
                <div>
                    <div className="shippingAddressForm"></div>
                    
                    

                    <div className="shipToValues">
                    <div className="shipValuePair">
                    <label htmlFor="shippingValue" >Name</label>
                <div className="shippingValue">  {shipname} </div>
                </div>
                <div className="shipValuePair">
                <label htmlFor="ShipAdress1" >Address</label>
                  <div className="shippingValue">{address}</div>
                  </div>
                <div className="shipValuePair">
                  <label htmlFor="ShipCity" >City</label>
                  <div className="shippingValue">{city}</div>
                  </div>
                <div className="shipValuePair">
                  <label htmlFor="ShipZip" >Zip</label>
                  <div className="shippingValue">{zip}</div>
                  </div>
                <div className="shipValuePair">
                  <label htmlFor="ShipCountry" >Country</label>
                  <div className="shippingValue">{country}</div>
                </div>

                </div>
                </div>
                <Link to={`/Home`} className="backButton">Back to Shop</Link>
                </div>

            </div>

            )}

        </div>
 );
};

export default PaymentPage;