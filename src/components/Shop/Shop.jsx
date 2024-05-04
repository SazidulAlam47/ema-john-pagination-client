import { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";
import { useLoaderData } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useQuery } from "@tanstack/react-query";

const Shop = () => {
    const [products, setProducts] = useState([]);

    const { count: totalProducts } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(9);

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pages = [...Array(totalPages).keys()];

    const {
        data: cart,
        refetch,
        isPending,
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

    useEffect(() => {
        fetch(
            `https://ema-john-pagination-server.onrender.com/products?page=${currentPage}&size=${productsPerPage}`
        )
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [currentPage, productsPerPage]);

    const handlePageNumberChange = (e) => {
        setProductsPerPage(e.target.value);
        setCurrentPage(0);
    };

    const handleAddToCart = (product) => {
        const { name, price, img, shipping } = product;
        const orderedProduct = {
            name,
            price,
            img,
            shipping,
        };
        fetch("https://ema-john-pagination-server.onrender.com/cart", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(orderedProduct),
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
            <div>
                <div className="products-container">
                    {products.map((product) => (
                        <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>
                    ))}
                </div>
                <div className="pagination">
                    <button
                        onClick={() =>
                            currentPage > 0 && setCurrentPage(currentPage - 1)
                        }
                    >
                        Prev
                    </button>
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? "active" : ""}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        onClick={() =>
                            currentPage < totalPages - 1 &&
                            setCurrentPage(currentPage + 1)
                        }
                    >
                        Next
                    </button>
                    <label htmlFor="pageNumber">Products Per Page :</label>
                    <select
                        id="pageNumber"
                        value={productsPerPage}
                        onChange={handlePageNumberChange}
                    >
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                    </select>
                </div>
            </div>
            <Sidebar refetch={refetch} cart={cart} />
        </div>
    );
};

export default Shop;
