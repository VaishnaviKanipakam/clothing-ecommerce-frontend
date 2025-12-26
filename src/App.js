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
import Cart from "./components/Cart"
import MyProfilePage from "./components/MyProfilePage/index.js";
import { useState } from "react";
import CartContext from "./context/CartContext.js";

const App = () => {
  const [cartCount, setCartCount] = useState(0)

  return (
  <CartContext.Provider value={{cartCount, setCartCount}}>
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
        
            <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Cart />
              </DashboardLayout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/my-plofile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MyProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
    </CartContext.Provider>
  );
};

export default App;
