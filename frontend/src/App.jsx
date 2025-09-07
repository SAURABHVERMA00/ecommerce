import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Listing from './components/Listing';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [showCart, setShowCart] = useState(false);

  const handleLogin = () => {
    setIsAuth(true);
    setShowLogin(false);
  };
  const handleSignup = () => {
    setShowSignup(false);
    setShowLogin(true);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <CartProvider>
      <div className="app-container">
        <nav>
          <button onClick={() => setShowCart(v => !v)}>{showCart ? 'Hide Cart' : 'Cart'}</button>
          {isAuth ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)}>Login</button>
              <button onClick={() => setShowSignup(true)}>Signup</button>
            </>
          )}
        </nav>
        <Listing />
        {showCart && <Cart />}
        {showLogin && <div className="modal"><Login onLogin={handleLogin} /><button onClick={() => setShowLogin(false)}>Close</button></div>}
        {showSignup && <div className="modal"><Signup onSignup={handleSignup} /><button onClick={() => setShowSignup(false)}>Close</button></div>}
      </div>
    </CartProvider>
  );
}

export default App;
