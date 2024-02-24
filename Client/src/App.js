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
          <Route path="/about/fertilizers" element={<Fertilizer />} exact="true" />
          <Route path="/about/onion types" element={<Types />} exact="true" />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
