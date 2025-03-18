import { createBrowserRouter } from "react-router-dom"
import ManagerHomePage from "../pages/manager/home"
import SignInPage from "../pages/SIgnIn"
import SignUpPage from "../pages/SignUp"
import SuccessCheckoutPage from "../pages/SuccessCheckout"
import LayoutDashboard from "../components/layout"
import ManageCoursePage from "../pages/manager/courses"
import ManageCreateCourse from "../pages/manager/create-course"
import ManageCourseDetailPage from "../pages/manager/course-details"


const router = createBrowserRouter([
  {
    path:"/",
    element: <ManagerHomePage/>
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
  {
    path: "/manager",
    element:<LayoutDashboard/>,
    children:[
      {
        index: true,
        element: <ManagerHomePage/>
      },
      {
        path:'/manager/courses',
        element: <ManageCoursePage/>
      },
      {
        path:'/manager/courses/create',
        element: <ManageCreateCourse/>
      },
      {
        path:'/manager/courses/:id',
        element: <ManageCourseDetailPage/>
      }
    ],
  }
])

export default router