import { createBrowserRouter } from "react-router-dom"
import ManagerHome from "../pages/ManagerHome"
import SignInPage from "../pages/SIgnIn"
import SignUpPage from "../pages/SignUp"
import SuccessCheckoutPage from "../pages/SuccessCheckout"


const router = createBrowserRouter([
  {
    path:"/",
    element: <ManagerHome/>
  },
  {
    path:"/manager/sign-in",
    element:<SignInPage/>
  },
  {
    path:"/manager/sign-up",
    element:<SignUpPage/>
  },
  {
    path:"/success-checkout",
    element:<SuccessCheckoutPage/>
  },

])

export default router