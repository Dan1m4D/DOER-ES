import { createBrowserRouter } from "react-router-dom";
import App from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/my",
      element: <DashboardPage />,
    },
  ]);