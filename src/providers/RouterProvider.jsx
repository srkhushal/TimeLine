import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Settings } from "../pages/index.jsx";
import Layout from "../pages/Layout.jsx";

const NotFound = () => {
    return (
        <pre>
            Not Found
        </pre>
    )
}

const routes = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { path: "/", element: <Home /> },
            { path: "/settings", element: <Settings /> },
        ]
    }, {
        path: "*", element: <NotFound />
    }
])

export function Routes() {
    return (
        <RouterProvider router={routes} />
    )
}