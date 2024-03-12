import "./App.css";
import "./App.scss";
import Header from "./Components/Layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/User/Login";
import Home from "./Components/Home";
import Register from "./Components/User/Register";
import NewProduct from "./Components/Admin/NewProduct";
import Dashboard from "./Components/Admin/Dashboard";
import ProductTable from "./Components/Admin/ProductTable";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import Profile from "./Components/User/Profile";
import UserTable from "./Components/Admin/UserTable";
import FarmerInfo from "./Components/User/FarmerInfo";
import SellerInfo from "./Components/User/SellerInfo"
import Forum from "./Components/Forums/Forum";
import SingleForum from "./Components/Forums/SingleForum";
import Season from "./Components/About/Season";
import Fertilizer from "./Components/About/Fertilizer";
import Types from "./Components/About/Types";
import Production from "./Components/About/Production";
import Problem from "./Components/About/Problem";
import SingleProduct from "./Components/Product/SingleProduct";
import UpdateProfile from "./Components/User/UpdateProfile";
import About from "./Components/About/About";
import AdminCreateProduct from "./Components/Admin/AdminCreateProduct";
import SingleProductSeller from "./Components/Product/SingleProductSeller";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/signin" element={<Login></Login>} exact="true" />
          <Route path="/" element={<Home />} caseSensitive={true} />
          <Route path="/signup" element={<Register />} exact="true" />
          <Route path="/about/season" element={<Season/>} exact="true" />
          <Route path="/about/production" element={<Production/>} exact="true" />
          <Route path="/about/challenges" element={<Problem/>} exact="true" />
          <Route path="/about/fertilizers" element={<Fertilizer />} exact="true" />
          <Route path="/about/onion types" element={<Types />} exact="true" />
          <Route path="/about" element={<About />} exact="true" />
          <Route path="/dashboard" element={<Dashboard />} exact="true" />
          <Route path="/product/create" element={<NewProduct />} exact="true" />
          <Route path="/product/update/:id" element={<UpdateProduct />} exact="true" />
          <Route path="/product/list" element={<ProductTable />} exact="true" />
          <Route path="/user/list" element={<UserTable />} exact="true" />
          <Route path="/profile" element={<Profile/>} exact="true" />
          <Route path="/farmer/info" element={<FarmerInfo/>} exact="true" />
          <Route path="/seller/info" element={<SellerInfo/>} exact="true" />
          <Route path="/forum" element={<Forum/>} exact="true" />
          <Route path="/forum/open/:id" element={<SingleForum/>} exact="true" />
          <Route path="/single/user/product" element={<SingleProduct/>} exact="true" />
          <Route path="/single/seller/product" element={<SingleProductSeller/>} exact="true" />
          <Route path="/update/profile/:id" element={<UpdateProfile/>} exact="true" />


          <Route path="/admin/create/product" element={<AdminCreateProduct/> } exact="true" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
