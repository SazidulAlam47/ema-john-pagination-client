import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const storedCart = getShoppingCart();
    const storedCartIds = Object.keys(storedCart);

    const loadedProducts = await fetch('https://ema-john-pagination-server-six.vercel.app/products', {
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