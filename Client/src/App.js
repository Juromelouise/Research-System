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
import SellerInfo from "./Components/User/SellerInfo";
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
import BrowseProduct from "./Components/Product/BrowseProduct";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Cart/Checkout";
import ListOrders from "./Components/Order/ListOrders";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from "./Components/Order/OrderDetails";
import OrderList from "./Components/Order/OrderList";
import ForumTable from "./Components/Admin/ForumTable";
import DeletedSingleForum from "./Components/Forums/DeletedSingleForum";
import ForgotPassword from "./Components/User/ForgotPassword";
import NewPassword from "./Components/User/NewPassword";
import HighDemand from "./Components/Charts/HighDemand";
import TotalSaleUser from "./Components/Charts/TotalSaleUser";

function App() {
  return (
    <div className="App" style={{overflowX: "hidden"}}>
      <Router>
        <Header />
        <Routes>
          <Route path="/signin" element={<Login></Login>} exact="true" />
          <Route path="/" element={<Home />} caseSensitive={true} />
          <Route path="/signup" element={<Register />} exact="true" />
          <Route path="/about/season" element={<Season />} exact="true" />
          <Route
            path="/about/production"
            element={<Production />}
            exact="true"
          />
          <Route path="/about/challenges" element={<Problem />} exact="true" />
          <Route
            path="/about/fertilizers"
            element={<Fertilizer />}
            exact="true"
          />
          <Route path="/about/onion types" element={<Types />} exact="true" />
          <Route path="/about" element={<About />} exact="true" />
          <Route path="/dashboard" element={<Dashboard />} exact="true" />
          <Route path="/product/create" element={<NewProduct />} exact="true" />
          <Route
            path="/product/update/:id"
            element={<UpdateProduct />}
            exact="true"
          />
          <Route path="/product/list" element={<ProductTable />} exact="true" />
          <Route path="/user/list" element={<UserTable />} exact="true" />
          <Route path="/forum/list" element={<ForumTable />} exact="true" />
          <Route path="/profile" element={<Profile />} exact="true" />
          <Route path="/farmer/info" element={<FarmerInfo />} exact="true" />
          <Route path="/seller/info" element={<SellerInfo />} exact="true" />
          <Route path="/forgot/password" element={<ForgotPassword />} exact="true" />
          <Route path="/reset/password/:token" element={<NewPassword />} exact="true" />
          <Route path="/forum" element={<Forum />} exact="true" />
          <Route path="/high/demand" element={<HighDemand />} exact="true" />
          <Route path="/total/sale/user" element={<TotalSaleUser />} exact="true" />
          <Route
            path="/forum/open/:id"
            element={<SingleForum />}
            exact="true"
          />
          <Route
            path="/delete/forum/open/:id"
            element={<DeletedSingleForum />}
            exact="true"
          />
          <Route
            path="/single/user/product"
            element={<SingleProduct />}
            exact="true"
          />
          <Route
            path="/update/profile/:id"
            element={<UpdateProfile />}
            exact="true"
          />
          <Route
            path="/browse/product"
            element={<BrowseProduct />}
            exact="true"
          />
          <Route
            path="/product/product"
            element={<productLIst />}
            exact="true"
          />
          <Route path="/order/:id" element={<OrderDetails />} exact="true" />
          <Route path="/my/order" element={<ListOrders />} exact="true" />
          <Route path="/orders" element={<OrderList />} exact="true" />
          <Route path="/cart" element={<Cart />} exact="true" />
          <Route path="/checkout" element={<Checkout />} exact="true" />
          <Route
            path="/admin/create/product"
            element={<AdminCreateProduct />}
            exact="true"
          />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </div>
  );
}

export default App;
