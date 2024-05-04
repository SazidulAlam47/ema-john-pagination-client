import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./ReviewItem.css";

const ReviewItem = ({ product, handleRemoveFromCart }) => {
    const { _id, img, price, name, shipping } = product;
    return (
        <div className="review-item">
            <img src={img} alt="" />
            <div className="review-details">
                <p className="product-title">{name}</p>
                <p>
                    Price: <span className="orange-text">${price}</span>
                </p>
                <p>
                    Shipping: <span className="orange-text">${shipping}</span>
                </p>
            </div>
            <button
                onClick={() => handleRemoveFromCart(_id)}
                className="btn-delete"
            >
                <FontAwesomeIcon className="delete-icon" icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;
