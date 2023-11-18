import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from "react-toastify";
import { url } from '../App';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function ForgetPassword() {

  //form validation using formik
  let userSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required")
  });

  //function to send email to reset password
  const handleForgetPass = async (values) => {
    try {
      let res = await axios.post(`${url}/users/send-email`, {
        email: values.email
      })

      if (res.status === 200) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  return (
    <div>
      <Formik

        initialValues={{
          email: ""
        }}

        validationSchema={userSchema}

        onSubmit={(values) => {
          handleForgetPass(values)
        }}
      >
        {({ errors, touched }) => (
          <div className='container-fluid login'>
            <div className='login-form'>
              <div className='text-center text-success'><h1>Forgot password</h1></div>
              <div className='login-header text-center text-danger'><p>enter your email</p></div>
              <Form>
                <div className="form-group">
                  <label htmlFor="email" className='text-white'>Email</label>
                  <Field name="email" className="form-control" type="email" placeholder="Enter Email" />
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                </div>
                <div className='log-button pt-3'>
                  <Button variant="outline-secondary" type='submit'>
                    send
                  </Button>
                </div>
              </Form>
            </div>
          </div >
        )}
      </Formik>

    </div>
  )
}

export default ForgetPassword;
