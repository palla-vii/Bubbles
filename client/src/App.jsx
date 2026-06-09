/**
 * App.jsx - Main entry point for the React application
 *
 * This component serves as the root of our React app.
 * It will eventually contain:
 * - AuthContext provider (to wrap authentication state)
 * - SocketContext provider (to wrap Socket.io connection)
 * - Router (to handle page navigation)
 *
 * For now, it's a simple component that shows we're ready to build!
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
