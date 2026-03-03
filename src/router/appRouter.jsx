import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/user/Home";

export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </div>
  );
};
