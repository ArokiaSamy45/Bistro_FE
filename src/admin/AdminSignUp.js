import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React from "react";

function AdminSignUp() {
  let navigate = useNavigate();

  //form validation using formik
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  let userSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    mobile: Yup.string().required("Required"),
    password: Yup.string()
      .matches(
        passwordRules,
        "Password length  minimum 8 character and contains uppercase(A-Z) lowercase(a-z) and number(0-9)."
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "confirm password should match with password"
      )
      .required("Required"),
  });

  const handleSignUp = async (values) => {
    try {
        let res = await axios.post(`${url}/admin/adminSignUp`, {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            mobile: values.mobile,
            password: values.password,
        });

        if (res.status === 201) {
            toast.success(res.data.message);
            navigate("/adminLogin");
        }
    } catch (error) {
        // Display the error message in a toast
        toast.error(error.response.data.message);
        console.log(error);
    }
};


  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          password: "",
        }}
        validationSchema={userSchema}
        onSubmit={(values) => {
          handleSignUp(values);
        }}
      >
        {({ errors, touched }) => (
          <div className="container-fluid signUp-head">
            <div className="signUp-body">
              <div className="text-center text-info mt-5">
                <h1>Welcome</h1>
              </div>
              <div className="login-header text-center text-danger">
                <p>Admin sign up</p>
              </div>
              <Form>
                <Row className="mb-1">
                  <div className="form-group col">
                    <label htmlFor="firstName" className="text-white">
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      className="form-control"
                      type="text"
                      placeholder="Enter your firstName"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div style={{ color: "red" }}>{errors.firstName}</div>
                    ) : null}
                  </div>

                  <div className="form-group col">
                    <label htmlFor="lastName" className="text-white">
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      className="form-control"
                      type="text"
                      placeholder="Enter your lastName"
                    />
                    {errors.lastName && touched.lastName ? (
                      <div style={{ color: "red" }}>{errors.lastName}</div>
                    ) : null}
                  </div>
                </Row>

                <div className="form-group pt-1">
                  <label htmlFor="email" className="text-white">
                    email
                  </label>
                  <Field
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="mobile" className="text-white">
                    mobile
                  </label>
                  <Field
                    name="mobile"
                    className="form-control"
                    type="text"
                    placeholder="Enter your mobile"
                  />
                  {errors.mobile && touched.mobile ? (
                    <div style={{ color: "red" }}>{errors.mobile}</div>
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

                <div className="form-group pt-2">
                  <label htmlFor="confirmPassword" className="text-white">
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    className="form-control"
                    type="password"
                    placeholder="Enter Confirm Password"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                  ) : null}
                </div>

                <div className="d-flex justify-content-center mt-5">
                  <Button variant="outline-secondary" type="submit">
                    Sign Up
                  </Button>
                </div>
                <div className="m-2 p-3">
                  <h6 className=" text-warning text-center">
                    You have account please login
                  </h6>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="outline-secondary"
                      onClick={() => navigate("/adminLogin")}
                    >
                      Admin login
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default AdminSignUp;
