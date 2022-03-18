import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/providers/AuthContext";

export const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Danware
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/cart">
                Cart
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/products/new">
                    New Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={ handleLogout }>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/auth/signin">
                  Signin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
