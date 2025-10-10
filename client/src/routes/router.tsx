import {createBrowserRouter} from "react-router-dom"
import {App} from "../App.tsx";
import {MainPage} from "../pages/MainPage.tsx";
import {ErrorBoundary} from "../pages/ErrorBoundary.tsx";
import {SignUpPage} from "../pages/SignUpPage.tsx";
import {SignInPage} from "../pages/SignInPage.tsx";
import {ProfilePage} from "../pages/ProfilePage.tsx";
import {OffersPage} from "../pages/OffersPage.tsx";
import {CreateOffer} from "../pages/CreateOffer.tsx";
import {AdminPanel} from "../pages/AdminPanel.tsx";
import {AdminPanel_Users} from "../components/AdminPanel/AdminPanel_Users.tsx";
import {AdminPanel_Offers} from "../components/AdminPanel/AdminPanel_Offers.tsx";
import {Dashboard} from "../components/MainPage/Dashboard.tsx";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "", element: <MainPage />, children: [
          { path: "dashboard", element: <Dashboard /> }
        ]
      },
      { path: "signUp", element: <SignUpPage /> },
      { path: "signIn", element: <SignInPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "offers", element: <OffersPage /> },
      { path: "createOffer", element: <CreateOffer /> },
      {
        path: "adminPanel",
        element: <AdminPanel />,
        children: [
          { path: "users", element: <AdminPanel_Users /> },
          { path: "offers", element: <AdminPanel_Offers /> }
        ]
      }
    ]
  }
]);
