import React, { useState, useEffect, useContext } from "react";
import DisplayUser from "../../components/DisplayUser/DisplayUser";
import UserContext from "../../contexts/UserContexts";
import SaleContext, { sales } from "./contexts/SaleContexts";


//components of content:
import Header from "../../components/Header/Header";


const AdminSetSale = () => {
    const [sale, setSale] = useState(sales.endOfYearSale);
    const { user, toggleUser } = useContext(UserContext);

    return (
        <div></div>
        )
}