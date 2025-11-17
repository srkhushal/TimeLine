import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/index.jsx";
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