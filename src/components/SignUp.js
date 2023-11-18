import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { url } from "../App";
import { toast } from "react-toastify";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { RegisterUser } from "../apicalls/users";



function SignUp() {

  let navigate = useNavigate()


  //form validation using formik
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  let userSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    mobile: Yup.string().required("Required"),
    password: Yup.string()
      .matches(passwordRules, 'Password length  minimum 8 character and contains uppercase(A-Z) lowercase(a-z) and number(0-9).')
      .required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "confirm password should match with password").required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    pincode: Yup.string().min(6).required("Required"),
  });

  //function to save user details
  const handleSignUp = async (values) => {
    try {
      
      const response = await RegisterUser(values);

     
      if (response.success) {
        navigate("/login");
        toast.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        // Handle cases where error.response is undefined or does not have expected properties
        console.error('An error occurred:', error);
        toast.error('An error occurred. Please try again later.');
      }
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
          address: "",
          city: "",
          state: "",
          pincode: ""
        }}

        validationSchema={userSchema}

        onSubmit={(values) => {
          handleSignUp(values)
        }}
      >
        {({ errors, touched }) => (
          <div className='container-fluid signUp-head'>
            <div className='signUp-body'>
              
              <div className='login-header text-center text-white'><p>Sign Up</p></div>
              <Form>
                <Row className='mb-1'>
                  <div className="form-group col">
                    <label htmlFor="firstName" className='text-secondary'>First Name</label>
                    <Field name="firstName" className="form-control" type="text" placeholder="Enter your firstName" />
                    {errors.firstName && touched.firstName ? (
                      <div style={{ color: "red" }}>{errors.firstName}</div>
                    ) : null}
                  </div>

                  <div className="form-group col">
                    <label htmlFor="lastName" className='text-secondary'>Last Name</label>
                    <Field name="lastName" className="form-control" type="text" placeholder="Enter your lastName" />
                    {errors.lastName && touched.lastName ? (
                      <div style={{ color: "red" }}>{errors.lastName}</div>
                    ) : null}
                  </div>
                </Row>

                <div className="form-group pt-1">
                  <label htmlFor="email" className='text-secondary'>Email</label>
                  <Field name="email" className="form-control" type="email" placeholder="Enter your email" />
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="mobile" className='text-secondary'>Mobile</label>
                  <Field name="mobile" className="form-control" type="text" placeholder="Enter your mobile" />
                  {errors.mobile && touched.mobile ? (
                    <div style={{ color: "red" }}>{errors.mobile}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="password" className='text-secondary'>Password</label>
                  <Field name="password" className="form-control" type="password" placeholder="Enter Password" />
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="confirmPassword" className='text-secondary'>Confirm Password</label>
                  <Field name="confirmPassword" className="form-control" type="Password" placeholder="Enter confirm password" />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="address" className='text-secondary'>Address</label>
                  <Field name="address" className="form-control" type="text" placeholder="Enter your address" />
                  {errors.address && touched.address ? (
                    <div style={{ color: "red" }}>{errors.address}</div>
                  ) : null}
                </div>

                <Row className='mt-3'>
                  <div className="form-group col">
                    <label htmlFor="city" className='text-secondary'>City</label>
                    <Field name="city" className="form-control" type="text" placeholder="Enter city" />
                    {errors.city && touched.city ? (
                      <div style={{ color: "red" }}>{errors.city}</div>
                    ) : null}
                  </div>

                  <div className="form-group col">
                    <label htmlFor="state" className='text-secondary'>State</label>
                    <Field name="state" className="form-control" type="text" placeholder="Enter state" />
                    {errors.state && touched.state ? (
                      <div style={{ color: "red" }}>{errors.state}</div>
                    ) : null}
                  </div>

                  <div className="form-group col">
                    <label htmlFor="pincode" className='text-secondary'>Pincode</label>
                    <Field name="pincode" className="form-control" type="text" placeholder="Enter pincode" />
                    {errors.pincode && touched.pincode ? (
                      <div style={{ color: "red" }}>{errors.pincode}</div>
                    ) : null}
                  </div>
                </Row>
                <div className='d-flex justify-content-center mt-5'>
                  <Button variant="outline-secondary" type='submit'>
                    Sign Up
                  </Button>
                </div>
                <div className='m-2 p-3'>
                  <h6 className=' text-warning text-center'>If you have already account please login</h6>
                  <div className='d-flex justify-content-center'>
                    <Button variant="outline-secondary" onClick={() => navigate('/login')}>
                      Login
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div >
        )}
      </Formik>

    </div>
  )
}

export default SignUp;
