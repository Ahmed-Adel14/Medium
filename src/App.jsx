import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Stats from "./pages/Stats";
import Stories from "./pages/Stories";
import Profile from "./pages/Profile";
import Following from "./pages/Following";
import Suggestions from "./pages/Suggestions";
import Notifications from "./pages/Notifications";
import SubscriptionPage from "./pages/SubscriptionPage";
import More from "./pages/More";
import ExploreTopic from "./pages/ExploreTopic";
import Publish from "./pages/Publish";
import Login from "./pages/Login";
import Loading from "./pages/Loading";
import Welcome from "./pages/Welcome";
import Choose from "./pages/Choose";
import SignIn from "./pages/SignIn";
import AuthorPage from "./pages/AuthorPage";
import ReadingList from "./pages/ReadingList";

export default function App() {
    const routing = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/Login" replace />, // هنا بقى الريدايركت
                },
                {
                    path: "/Home",
                    element: <Home />,
                },
                {
                    path: "/Library",
                    element: <Library />,
                },
                {
                    path: "/Profile",
                    element: <Profile />,
                },
                {
                    path: "/Stats",
                    element: <Stats />,
                },
                {
                    path: "/Stories",
                    element: <Stories />,
                },
                {
                    path: "/Following",
                    element: <Following />,
                },
                {
                    path: "/Suggestions",
                    element: <Suggestions />,
                },
                {
                    path: "/Notifications",
                    element: <Notifications />,
                },
                {
                    path: "/article/:slug",
                    element: <More />,
                },
                {
                    path: "/ExploreTopic",
                    element: <ExploreTopic />,
                },
                {
                    path: "/author/:id",
                    element: <AuthorPage />,
                },
                {
                    path: "/Reading-List",
                    element: <ReadingList />,
                },
            ],
        },
        {
            path: "/subscribe",
            element: <SubscriptionPage />,
        },
        {
            path: "/Publish",
            element: <Publish />,
        },
        {
            path: "/Login",
            element: <Login />,
        },
        {
            path: "/Loading",
            element: <Loading />,
        },
        {
            path: "/Welcome",
            element: <Welcome />,
        },
        {
            path: "/Choose",
            element: <Choose />,
        },
        {
            path: "/SignIn",
            element: <SignIn />,
        },
    ]);

    return <RouterProvider router={routing} />;
}
