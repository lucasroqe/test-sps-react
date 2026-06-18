import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate,
  Outlet
} from "react-router-dom"

import { SignIn } from "./routes/SignIn"
import { Home } from "./routes/Home"
import { Users } from "./routes/Users"
import { UserEdit } from "./routes/UserEdit"
import { ErrorPage } from "./routes/ErrorPage"


function ProtectedLayout() {
  const isAuthenticated = !!localStorage.getItem("token")

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }
  
return (
    <div className="app-container">
      <Outlet /> 
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/new",
        element: <UserEdit />,
      },
      {
        path: "users/:id",
        element: <UserEdit />,
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}