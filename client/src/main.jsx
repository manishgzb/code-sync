import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditorPage from "./pages/EditorPage.jsx";
import RoomPage from "./pages/RoomPage.jsx";
import SocketContextProvider from "./contexts/SocketContext.jsx";
import RoomContextProvider from "./contexts/RoomContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage/>
      },
      {
        path:'signup',
        element:<SignupPage/>
      },
      {
        path: 'room',
        element: <PrivateRoute><RoomPage /></PrivateRoute>
      },
      {
        path: 'editor',
        element: <PrivateRoute><EditorPage /></PrivateRoute>
      },
      {
        path:'login',
        element:<LoginPage></LoginPage>
      }
    ]
  }
])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <RoomContextProvider>
          <RouterProvider router={router} >
            </RouterProvider>
        </RoomContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
