import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "../pages";
import RootLayout from "../pages/AppLayout";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"
import ProtectedRoute from "../components/ProtectedRoute";
import CookiesService from "../services/cookies";

const token = CookiesService.getCookie('jwt');

export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout />} errorElement={<h1>ERROR</h1>}>
            <Route index element={
            <ProtectedRoute isAuthenticated={token}>
                <HomePage />
            </ProtectedRoute>
        } />
            <Route path="products" element={
                            <ProtectedRoute isAuthenticated={token}>
                                <ProductsPage />
                            </ProtectedRoute>
                        } />
            <Route path="products/:documentId" element={
                            <ProtectedRoute isAuthenticated={token}>
                                <ProductDetailsPage />
                            </ProtectedRoute>
                        } />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
        </Route>
    </>
));


// export const router = createBrowserRouter(createRoutesFromElements(
//     <>
//         <Route path="/" element={
//             <ProtectedRoute isAuthenticated={token}>
//                 <RootLayout />
//             </ProtectedRoute>
//         } errorElement={<h1>ERROR</h1>}>
//             <Route index element={<HomePage />} />
//             <Route path="products" element={<ProductsPage />} />
//             <Route path="products/:documentId" element={<ProductDetailsPage />} />
//         </Route>
//         <Route path="login" element={<LoginPage />} />
//         <Route path="register" element={<RegisterPage />} />
//     </>
// ));
