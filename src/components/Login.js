import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { LoginUser } from "../apicalls/users";

function Login() {
  let navigate = useNavigate();

  //form validation using formik
  let userSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  //login function
  let handleLogin = async (values) => {
    try {
      let res = await axios.post(`${url}/users/login`, {
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        navigate("/menu");
      } else {
        toast.error("An error occurred dung login.");
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={userSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <div className="container-fluid login">
            <div className="login-form">
              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-secondary"
                  className="text-center"
                  onClick={() => navigate("/adminLogin")}
                >
                  Admin login
                </Button>
              </div>
              <div className="login-header text-center text-success">
                <p>Login</p>
              </div>
              <Form>
                <div className="form-group">
                  <label htmlFor="email" className="text-white">
                    Email
                  </label>
                  <Field
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Enter Email"
                  />
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="password" className="text-white">
                    Password
                  </label>
                  <Field
                    name="password"
                    className="form-control"
                    type="password"
                    placeholder="Enter Password"
                  />
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  ) : null}
                </div>
                <div className="log-button pt-3">
                  <Button variant="outline-secondary" type="submit">
                    Login
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/forgetPassword")}
                  >
                    Forget password
                  </Button>
                </div>
              </Form>
              <div className="m-2 pt-3">
                <h4 className=" text-warning text-center">
                  New to SeaView Bistro.. Please sign up
                </h4>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-secondary"
                    className="text-center"
                    onClick={() => navigate("/signUp")}
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;
