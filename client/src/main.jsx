import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";


createRoot(document.getElementById('root')).render(
  
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>

)
