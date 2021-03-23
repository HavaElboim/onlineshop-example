import React, { useState, useEffect, useContext } from "react";
import "./Admin.css";

const Admin = () => {
    const [color] = useState("red");
    const [secondsLeft, setSecondsLeft] = useState(65);
    const [salesProductsIds] = useState([1, 3, 5, 6]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [isSale, setSale] = useState("true");
    const [productName, setName] = useState("");
    const [productDescription, setDescription] = useState("");
    const [productURL, setURL] = useState("");
    const [productPrice, setPrice] = useState("");
    const [quantityInStock, setQuantity] = useState("");
    const [notAllFieldsFilled, setFieldsFilled] = useState(false);
  
    const { theme } = useContext(ThemeContext);
  
    console.log("theme", theme);
  
    useEffect(() => {
      fetch("/api/products")
        .then((result) => result.json())
        .then((data) => {
          setProducts(data);
        });
      console.log("fetched ");
    }, []);

    