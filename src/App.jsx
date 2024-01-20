import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CitiesContextProvider from "./context/CitiesContext";
import Homepage from "./pages/homepage/Homepage";
import Pricing from "./pages/pricing/Pricing";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import AppLayout from "./pages/app-layout/AppLayout";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import CityList from "./pages/app-layout/sidebar/city-list/CityList";
import CountryList from "./pages/app-layout/sidebar/countries-list/CountryList";
import CityDetails from "./pages/app-layout/sidebar/city-details/CityDetails";
import Form from "./pages/app-layout/sidebar/form/Form";

export default function App() {
  return (
    <CitiesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<CityDetails />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesContextProvider>
  );
}
