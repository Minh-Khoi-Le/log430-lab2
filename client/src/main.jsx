/**
 * Main Entry Point for the React Application
 * 
 */

// Import Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
// Import custom CSS
import './assets/index.css'
import App from './App.jsx'
// Import context providers for global state management
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";

// Render the application with context providers
// UserProvider - Manages user authentication state
// CartProvider - Manages shopping cart state
createRoot(document.getElementById('root')).render(
  
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
)