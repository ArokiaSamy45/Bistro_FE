import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "../src/components/Login";
import AdminLogin from './admin/AdminLogin';
import AdminSignUp from './admin/AdminSignUp'
import AdminHome from './admin/AdminHome';
import SignUp from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import Menu from './components/Menu';
import AddToCart from './products/AddtoCart';
import SuccessOrder from './products/OrderSuccess';
import OrderedItems from './products/OrderedItems';
import AllOrders from './admin/AllOrders';
import AddProducts from './admin/AddProducts';
import AllProducts from './admin/AllProducts';
import OrderStatus from './admin/OrderStatus';
import AdminForgotPassword from './admin/AdminForgotPassword';
import AdminResetPassword from './admin/AdminResetPassword';
import { isAuthenticated } from './utils/AuthUtils';


export const url = 'https://bistro-be.onrender.com'




function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/adminSignUp' element={<AdminSignUp />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/menu' element={<MenuGuarded />} />
        <Route path='/cart' element={<AddToCart />} />
        <Route path='/success' element={<SuccessOrder />} />
        <Route path='/orders' element={<OrderedItems />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        <Route path='/logout' element={<Home />} />

        <Route path='/adminHome' element={<AdminHome />}>
          <Route path='all-orders' element={<AllOrders />} />
          <Route path='add-products' element={<AddProducts />} />
          <Route path='edit-products/:id' element={<AddProducts />} />
          <Route path='all-products' element={<AllProducts />} />
          <Route path='order-status' element={<OrderStatus />} />
        </Route>
        <Route path='/adminForgot' element={<AdminForgotPassword />} />
        <Route path='/admin-reset-password/:id/:token' element={<AdminResetPassword />} />

        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
    </BrowserRouter>

  </>
}

// MenuGuarded component with route guard
function MenuGuarded() {
  return isAuthenticated() ? <Menu /> : <Navigate to="/" />;
}


export default App;