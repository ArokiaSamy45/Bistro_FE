import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { url } from "../App"

function AdminLogin() {

    let navigate = useNavigate()

    //form validation using formik
    let userSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
    });

    //calling  admin login
    let handleAdminLogin = async (values) => {
        try {
            let res = await axios.post(`${url}/admin/adminLogin`, {
                email: values.email,
                password: values.password
            })

            if (res.status === 200) {
                sessionStorage.setItem('token', res.data.token)
                toast.success(res.data.message)
                navigate('/adminHome')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }



    return (
        <div>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}

                validationSchema={userSchema}

                onSubmit={(values) => {
                    handleAdminLogin(values)
                }}
            >
                {({ errors, touched }) => (
                    <div className='container-fluid login'>
                        <div className='login-form'>
                            <div className='text-center text-success'><h1>Welcome</h1></div>
                            <div className='login-header text-center text-danger'><p>Admin login</p></div>
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email" className='text-white'>Email</label>
                                    <Field name="email" className="form-control" type="email" placeholder="Enter Email" />
                                    {errors.email && touched.email ? (
                                        <div style={{ color: "red" }}>{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="form-group pt-3">
                                    <label htmlFor="password" className='text-white'>Password</label>
                                    <Field name="password" className="form-control" type="password" placeholder="Enter Password" />
                                    {errors.password && touched.password ? (
                                        <div style={{ color: "red" }}>{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className='d-flex justify-content-between p-3'>
                                    <Button type="submit" variant="outline-secondary">Admin login</Button>
                                    <Button type="button" variant="outline-secondary" onClick={()=>navigate('/adminSignUp')}>Admin SignUp</Button>
                                </div>
                                <div className='m-2 p-3'>
                                    <h6 className=' text-warning text-center'>Forgot your password ?</h6>
                                    <div className='d-flex justify-content-center'>
                                        <Button variant="outline-secondary" onClick={() => navigate('/adminForgot')}>
                                            forgot-password
                                        </Button>
                                    </div>
                                </div>
                                <div className='m-2 p-3'>
                                    <h6 className=' text-warning text-center'>Customer please visit customer login</h6>
                                    <div className='d-flex justify-content-center'>
                                        <Button variant="outline-secondary" onClick={() => navigate('/login')}>
                                            login
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div >
                )}
            </Formik>

        </div>
    );


}

export default AdminLogin
