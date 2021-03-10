import React, { useEffect, useRef, useContext } from "react";
import "./SaleCountdown.css";
import PropTypes from "prop-types";
import ThemeContext from "../../contexts/ThemeContexts";

/* this component is called by the Header component *

/* counts down by seconds the time left until the end of the sale,
and sets state of display message depending on whether the sale has finished */

const SaleCountdown = (props) => {
  const { secondsLeft, setSecondsLeft, isSale, setSale } = props;
  const [theme] = useContext(ThemeContext);

  const convertToDHMS = () => {
    let temp = "";
    if (secondsLeft) {
      temp = `
      ${Math.floor(secondsLeft / (60 * 60 * 24))}:${Math.floor(
        (secondsLeft / (60 * 60)) % 24
      )}:`;
      temp = `${temp}${Math.floor((secondsLeft / 60) % 60)}:${Math.floor(
        secondsLeft % 60
      )}`;
      return temp;
    }
  };

  /************************************ */
  /* version using setTimeout.
  /************************************ */
  /*without the use of useRef, we could not use setInterval here, as it causes an infinite loop! 
  /* Each time the state of DHMSLeft is updated, useEffect sets a 1 second timeout.
  At the end of the timeout, the state of the DHMSLeft and secondsLeft update, and so the useEffect runs again,
  and sets another 1 second timeout.
  If the secondsLeft reaches zero
 
  useEffect(() => {
    const countdown = setTimeout(() => {
      if (secondsLeft) {
        setSecondsLeft(secondsLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(countdown);
    */

  /************************************ */
  /* version using setInterval - needs to use useRef.
  /************************************ */
  const intervalRef = useRef();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (secondsLeft) {
        setSecondsLeft(secondsLeft - 1);
        console.log("counting down, secs:", secondsLeft);
        setSale("true");
      } else {
        setSale("false");
      }
    }, 1000);

    //use useRef to create a mutable ref object from the setTimeout identifier ("countdown").
    // This lets the timeout id be accessible from the whole component.
    // If we stored the id in a state variable, the component would be re-rendered
    // after the state update so a new interval will be created, creating an infinite loop.
    intervalRef.current = countdown;

    /********************** */
    /* EXPLANATION:          */
    /********************** */
    /* the intervalRef's current value is updated if starting a new countdown, 
    but the intervalRef itself stays fixed in the DOM and doesn't re-render when there's a change in 
    state of the secondsLeft variable
    This how the infinite loop is prevented.
    */

    // Clear timeout if the component is unmounted
    return () => clearTimeout(countdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);
  //The return will runs each time useEffect finishes the timeout except for the first time
  // and clears the timeout if the component is unmounted

  const saleMessage = () => {
    return secondsLeft
      ? `10% off!! ${convertToDHMS(
          secondsLeft
        )} days left until the end of the Sale`
      : "Sale over";
  };

  return (
    <div style={{ color: theme.foreground, background: theme.background }}>
      <h2 id="message">{saleMessage()} </h2>
    </div>
  );
};

SaleCountdown.propTypes = {
  secondsLeft: PropTypes.number,
  setSecondsLeft: PropTypes.func,
};

export default SaleCountdown;
