import {createBrowserRouter} from "react-router-dom"
import {App} from "../App.tsx";
import {MainPage} from "../pages/MainPage.tsx";
import {ErrorBoundary} from "../pages/ErrorBoundary.tsx";
import {SignUpPage} from "../pages/SignUpPage.tsx";
import {SignInPage} from "../pages/SignInPage.tsx";
import {ProfilePage} from "../pages/ProfilePage.tsx";
import {OffersPage} from "../pages/OffersPage.tsx";
import {CreateOffer} from "../pages/CreateOffer.tsx";
import {MyOffersPage} from "../pages/MyOffersPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorBoundary/>,
    children: [
      { index: true, element: <MainPage/> },
      { path: "/signUp", element: <SignUpPage/> },
      { path: "/signIn", element: <SignInPage/> },
      { path: "/profile", element: <ProfilePage/> },
      { path: "/offers", element: <OffersPage/> },
      { path: "/createOffer", element: <CreateOffer/> },
      { path: "/myOffers", element: <MyOffersPage/>}
    ]
  }
]);