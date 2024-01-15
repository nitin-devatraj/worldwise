import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Pricing from "./pages/pricing/Pricing";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import AppLayout from "./pages/app-layout/AppLayout";
import PageNotFound from "./pages/page-not-found/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
