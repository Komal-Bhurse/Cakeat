import './App.css';
import {Route,Routes} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import UserCart from './pages/UserCart';
import ProductDetials from './pages/ProductDetials';
import Admin from './pages/Admin';

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<UserCart/>}/>
      <Route path='/product/:id' element={<ProductDetials/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
