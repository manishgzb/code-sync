import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import "./yjs-cursor-style.css"
import AuthContextProvider from "./contexts/AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditorPage from "./pages/EditorPage.jsx";
import RoomPage from "./pages/RoomPage.jsx";
import SocketContextProvider from "./contexts/SocketContext.jsx";
import RoomContextProvider from "./contexts/RoomContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import JoinRoomPage from "./pages/JoinRoomPage.jsx";
import CreateRoomPage from "./pages/CreateRoomPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path:'signup',
        element:<SignupPage/>
      },
      {
        path:'login',
        element:<LoginPage/>
      },
      {
        path: 'room',
        element: <PrivateRoute><RoomPage /></PrivateRoute>
      },
      {
        path:'room/join',
        element:<PrivateRoute><JoinRoomPage/></PrivateRoute>
      },
      {
        path:'room/create',
        element:<PrivateRoute><CreateRoomPage></CreateRoomPage></PrivateRoute>
      },
      {
        path: 'editor',
        element: <PrivateRoute><EditorPage /></PrivateRoute>
      },
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
