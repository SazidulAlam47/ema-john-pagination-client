import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../Sidebar/Sidebar";

const Orders = () => {
    const {
        data: cart,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await fetch(
                "https://ema-john-pagination-server.onrender.com/cart"
            );
            const data = res.json();
            return data;
        },
    });

    const handleRemoveFromCart = (id) => {
        // console.log(`https://ema-john-pagination-server.onrender.com/cart/${id}`);
        fetch(`https://ema-john-pagination-server.onrender.com/cart/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                refetch();
            });
    };

    if (isPending) {
        return (
            <div className="shop-container">
                <div className="review-container">
                    <h3>Loading...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-container">
            <div className="review-container">
                {cart?.map((product) => (
                    <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem>
                ))}
            </div>
            <Sidebar refetch={refetch} cart={cart} />
        </div>
    );
};

export default Orders;
