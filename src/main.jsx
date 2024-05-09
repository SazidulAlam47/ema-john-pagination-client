import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./components/Shop/Shop";
import Home from "./components/Layout/Home";
import Orders from "./components/Orders/Orders";
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import Checkout from "./components/Checkout/Checkout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [
            {
                path: "/",
                element: <Shop></Shop>,
                loader: () =>
                    fetch(
                        "https://ema-john-pagination-server-six.vercel.app/productsCount"
                    ),
            },
            {
                path: "orders",
                element: <Orders></Orders>,
            },
            {
                path: "inventory",
                element: <Inventory></Inventory>,
            },
            {
                path: "checkout",
                element: <Checkout></Checkout>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
