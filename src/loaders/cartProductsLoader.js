import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const storedCart = getShoppingCart();
    const storedCartIds = Object.keys(storedCart);

    const loadedProducts = await fetch('http://localhost:5000/products', {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(storedCartIds),
    });
    const cart = await loadedProducts.json();

    return cart;
}

export default cartProductsLoader;