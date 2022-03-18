import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonSpinner } from "../../components/ui/ButtonSpinner";
import { useAuth } from "../../context/providers/AuthContext";

export const Signin = () => {
  const { signin, isLoading, errorMessage } = useAuth();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await signin(user);
      if (userResponse) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row h-100">
      <div className="col-md-4 offset-md-4 my-auto p-2">
        {errorMessage && (
          <div
            className="alert alert-danger text-center rounded-0"
            role="alert"
          >
            {errorMessage}
          </div>
        )}
        <div className="card card-body">
          <h2>Signin</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control rounded-0"
                placeholder="yourmail@company.com"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control rounded-0"
                placeholder="Write your password"
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary rounded-0">
              {isLoading ? <ButtonSpinner /> : <span>Signin</span>}
            </button>
            <Link className="d-block mt-4" to="/auth/signup">Do you have an Account? Sign up</Link>
          </form>
        </div>
      </div>
    </div>
  );
};
