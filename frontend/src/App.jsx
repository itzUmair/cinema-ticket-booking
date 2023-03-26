import { Login, Signup, ProtectedRoutes, AuthLayout } from "./components/index";
import { UserAuth, AdminAuth, Dashboard, AdminDashboard } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/user/auth" element={<UserAuth />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
