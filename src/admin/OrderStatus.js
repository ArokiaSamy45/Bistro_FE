import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { url } from "../App";
import { toast } from "react-toastify";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function OrderStatus() {

  let token = sessionStorage.getItem('token')

  // formik validation schema
  let userSchema = Yup.object().shape({
    orderId: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  //function to change state from  pending to delivery
  const handleOrderStatus = async (values) => {
    try {
      let res = await axios.post(`${url}/admin/order-Status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        OrderId:values.orderId,
        Status:values.status
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
            orderId: "",
            status: "",
        }}

        validationSchema={userSchema}

        onSubmit={(values) => {
          handleOrderStatus(values)
        }}
      >
        {({ errors, touched }) => (
          <div className='container-fluid d-flex justify-content-center '>
            <div className='add-products p-5'>
              <div className='login-header text-center text-danger'><p>Change status</p></div>
              <Form>
                <div className="form-group pt-1">
                  <label htmlFor="orderId" className='text-white'>Order-Id</label>
                  <Field name="orderId" className="form-control" type="text" placeholder="Enter orderId" />
                  {errors.orderId && touched.orderId ? (
                    <div style={{ color: "red" }}>{errors.orderId}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="status" className='text-white'>Status</label>
                  <Field name="status" className="form-control" type="text" placeholder="Enter status" />
                  {errors.status && touched.status ? (
                    <div style={{ color: "red" }}>{errors.status}</div>
                  ) : null}
                </div>

                <div className='d-flex justify-content-center mt-5'>
                  <Button variant="outline-secondary" type='submit'>
                   Submit
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

export default OrderStatus;
