import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import CitiesContextProvider from "./context/CitiesContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./pages/app-layout/sidebar/city-list/CityList";
import CountryList from "./pages/app-layout/sidebar/countries-list/CountryList";
import CityDetails from "./pages/app-layout/sidebar/city-details/CityDetails";
import Form from "./pages/app-layout/sidebar/form/Form";
import SpinnerFullPage from "./components/spinner-fullpage/SpinnerFullPage";

// import Homepage from "./pages/homepage/Homepage";
// import Pricing from "./pages/pricing/Pricing";
// import Product from "./pages/product/Product";
// import Login from "./pages/login/Login";
// import AppLayout from "./pages/app-layout/AppLayout";
// import PageNotFound from "./pages/page-not-found/PageNotFound";

const Homepage = lazy(() => import("./pages/homepage/Homepage"));
const Pricing = lazy(() => import("./pages/pricing/Pricing"));
const Product = lazy(() => import("./pages/product/Product"));
const Login = lazy(() => import("./pages/login/Login"));
const AppLayout = lazy(() => import("./pages/app-layout/AppLayout"));
const PageNotFound = lazy(() => import("./pages/page-not-found/PageNotFound"));

export default function App() {
  return (
    <AuthContextProvider>
      <CitiesContextProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<CityDetails />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesContextProvider>
    </AuthContextProvider>
  );
}
