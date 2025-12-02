import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Registration from "./components/Registration";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute.js";
import DashboardLayout from "./components/DashboardLayout.js";
import MenSection from "./components/MenSection/index.js";
import WomenSection from "./components/WomenSection/index.js";
import KidsSection from "./components/KidsSection/index.js";
import ProductDetailPage from "./components/ProductDetailPage/index.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/men"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MenSection />
              </DashboardLayout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/women"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <WomenSection />
              </DashboardLayout>
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/kids"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <KidsSection />
              </DashboardLayout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductDetailPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
