import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Context from "./components/Context";
import Catalog from "./components/Catalog";
import Product from "./components/Product";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Register from "./components/Register";

import Admin from "./components/Admin";
import AdminCreateProduct from "./components/AdminCreateProduct";
import AdminTransactions from "./components/AdminTransactions";

import NavbarC from "./components/NavbarC";

function App() {
  return (
    <Router>
      <Context>
        {<NavbarC />}
        <Routes>
          <Route path="/" element={<Catalog />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path=":id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admincreateproduct" element={<AdminCreateProduct />} />
          <Route path="/admintransactions" element={<AdminTransactions />} />
        </Routes>
      </Context>
    </Router>
  );
}

export default App;
