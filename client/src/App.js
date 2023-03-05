import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import ProductLists from './Pages/Admin/ProductLists';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Dashboard from './Pages/User/Dashboard';
import AdminRoute from './Routes/AdminRoute';
import PrivateRoute from './Routes/Private';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      {/* protected User Routes  */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
      </Route>
      {/* protected User Routes Ends  */}

      {/* protected Admin Routes  */}
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/products" element={<ProductLists />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/:slug" element={<UpdateProduct />} />
      </Route>
      {/* protected Admin Routes Ends  */}

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;



