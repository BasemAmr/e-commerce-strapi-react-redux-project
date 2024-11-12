import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "../pages";
import RootLayout from "../pages/AppLayout";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import ProductsTab from "../pages/admin/ProductsTab";
import UsersManagement from "../pages/admin/UsersManagement";
import { AdminRoute } from "../components/admin/AdminRoute";

export const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<ProtectedRoute><RootLayout /></ProtectedRoute>} errorElement={<h1>ERROR</h1>}>
      <Route index element={<HomePage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="products/:documentId" element={<ProductDetailsPage />} />
    </Route>
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>} 
    errorElement={<h1>ERROR</h1>}>
      <Route path="products" element={<ProductsTab />} />
      <Route path="users" element={<UsersManagement />} />
    </Route>
  </>
));