import { lazy } from "react";
import {createBrowserRouter} from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const CodeRoom = lazy(() => import("./pages/CodeRoom"));


const router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/:id",
        Component: CodeRoom
    }
]);


export default router;