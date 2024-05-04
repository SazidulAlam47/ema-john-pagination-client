import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";

const Sidebar = ({ refetch, cart }) => {
    const handleClearCart = () => {
        fetch("https://ema-john-pagination-server.onrender.com/cart", {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                refetch();
            });
    };
    return (
        <div className="cart-container">
            <Cart cart={cart} handleClearCart={handleClearCart}>
                <Link className="proceed-link" to="/orders">
                    <button className="btn-proceed">Review Order</button>
                </Link>
            </Cart>
        </div>
    );
};

export default Sidebar;
