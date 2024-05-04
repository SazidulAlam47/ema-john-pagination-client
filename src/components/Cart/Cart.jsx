import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cart, handleClearCart, children }) => {
    // const cart = props.cart; // option 1
    // const {cart} = props; // option 2

    let quantity = cart.length;
    let totalPrice = 0;
    let totalShipping = 0;
    cart.forEach((product) => {
        totalPrice = product.price + totalPrice;
        totalShipping = product.shipping + totalShipping;
    });

    const tax = (totalPrice * 7) / 100;

    const grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className="cart">
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Shipping: ${totalShipping}</p>
            <p>
                Tax: ${tax.toFixed(2)} (7% of ${totalPrice})
            </p>
            <h3>Grand Total: ${grandTotal.toFixed(2)} </h3>
            <button onClick={handleClearCart} className="btn-clear-cart">
                <span>Clear Cart </span>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {children}
        </div>
    );
};

export default Cart;
