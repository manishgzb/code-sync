import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditorPage from "./pages/EditorPage.jsx";
import RoomPage from "./pages/RoomPage.jsx";
import SocketContextProvider from "./contexts/SocketContext.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <RoomPage />
      },
      {
        path: 'room',
        element: <RoomPage />
      },
      {
        path: 'editor',
        element: <EditorPage />
      }
    ]
  }
])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
