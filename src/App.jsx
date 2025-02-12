import "./App.css";
import { Button } from "./components/ui/button";
import HomePage from "./pages/ShopPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import { AuthContextProvider } from "./Context/AuthContext";
import CartPage from "./pages/CartPage";
import ProductManagement from "./admin/ProductsManagement";
import Dashboard from "./admin/Dashboard";
import UploadProductImage from "./admin/uploadImage";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        {/* <NavBar /> */}
        <div className=" w-full ">
          <Routes>
            <Route path="/" element={<Layout />} >
            <Route index element={<HomePage />}/>
            <Route path="/mycart" element={<CartPage />}/>
            <Route path="/admin/dashboard" element={<Dashboard />}/>
            
            
            </Route>
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
