import { createBrowserRouter, redirect } from "react-router-dom"
import ManagerHomePage from "../pages/manager/home"
import SignInPage from "../pages/SIgnIn"
import SignUpPage from "../pages/SignUp"
import SuccessCheckoutPage from "../pages/SuccessCheckout"
import LayoutDashboard from "../components/layout"
import ManageCoursePage from "../pages/manager/courses"
import ManageCreateCourse from "../pages/manager/create-course"
import ManageCourseDetailPage from "../pages/manager/course-details"
import ManageContentCreate from "../pages/manager/course-content-create"
import ManageCoursePreviewPage from "../pages/manager/course-preview"
import ManageStudentsPage from "../pages/manager/students"
import ManageStudentscreate from "../pages/manager/student-create"
import StudentPage from "../pages/Students"
import secureLocalStorage from "react-secure-storage"
import { MANAGER_SESSION, STORAGE_KEY } from "../utils/const"
import { getCategory, getCourse, getCourseDetail, getDetailContent } from "../services/courseService"
import { getDetailStudents, getStudents } from "../services/studentService"


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
    id:MANAGER_SESSION,
    loader: async ()=>{
      const session = secureLocalStorage.getItem(STORAGE_KEY)
      console.log(session)

      if(!session || session.role !== 'manager'){
        throw redirect('/manager/sign-in')
      }
      return session
    },
    element:<LayoutDashboard isAdmin={true}/>,
    children:[
      {
        index: true,
        element: <ManagerHomePage/>
      },
      {
        path:'/manager/courses',
        loader: async()=>{
          const data = await getCourse()
          return data
        },
        element: <ManageCoursePage/>
      },
      {
        path:'/manager/courses/create',
        loader: async()=>{
          const categories = await getCategory()
          return {categories, course:null}
        },
        element: <ManageCreateCourse/>
      },
      {
        path:'/manager/courses/edit/:id',
        loader: async({params})=>{   
          const categories = await getCategory()
          const course = await getCourseDetail(params.id)
          return {categories, course: course?.data}
        },
        element: <ManageCreateCourse/>
      },
      {
        path:'/manager/courses/:id',
        loader: async({params})=>{
          const course = await getCourseDetail(params.id)
          return course?.data
        },
        element: <ManageCourseDetailPage/>
      },
      {
        path:'/manager/courses/:id/create',
        element:<ManageContentCreate/>
      },
      {
        path:'/manager/courses/:id/edit/:contentId',
        loader: async({params})=>{
          const content = await getDetailContent(params.contentId)
          return content?.data
        },
        element:<ManageContentCreate/>
      },
      {
        path:'/manager/courses/:id/preview',
        loader: async({params})=>{
          const course = await getCourseDetail(params.id, true)
          return course?.data
        },
        element:<ManageCoursePreviewPage/>
      },
      {
        path:'/manager/students',
        loader: async () =>{
          const students = await getStudents()
          return students?.data
        },
        element:<ManageStudentsPage/>
      },
      {
        path:'/manager/students/create',
        element:<ManageStudentscreate/>
      },
      
      {
        path:'/manager/students/edit/:id',
        loader: async ({ params }) =>{
          const students = await getDetailStudents(params.id)
          return students?.data
        },
        element:<ManageStudentscreate/>
      }
    ],
  },
  {
    path:"/student",
    element: <LayoutDashboard isAdmin={false}/>,
    children:[
      {
        index: true,
        element: <StudentPage/>
      },
      {
        path:"/student/detail-course/:id",
        element: <ManageCoursePreviewPage/>
      }
    ]
  }
])

export default router