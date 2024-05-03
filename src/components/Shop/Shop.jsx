import React, { useEffect, useState } from "react";
import {
    addToDb,
    deleteShoppingCart,
    getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const { count: totalProducts } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(9);

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pages = [...Array(totalPages).keys()];

    useEffect(() => {
        fetch(
            `http://localhost:5000/products?page=${currentPage}&size=${productsPerPage}`
        )
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [currentPage, productsPerPage]);

    const handlePageNumberChange = (e) => {
        setProductsPerPage(e.target.value);
        setCurrentPage(0);
    };

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find((product) => product._id === id);
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products]);

    const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find((pd) => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter((pd) => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id);
    };

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };

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
            <div className="cart-container">
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link className="proceed-link" to="/orders">
                        <button className="btn-proceed">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
