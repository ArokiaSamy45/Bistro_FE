import React,{useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { url } from "../App";
import { toast } from "react-toastify";
import { Formik, Form, Field, resetForm } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

function AddProducts() {

  //AddProduct and EditProduct has configured in same page

  let token = sessionStorage.getItem('token');
  let {id} = useParams();
  let [isValid, setIsValid] = useState(false);
  let navigate = useNavigate()

   //set initial values of the products
  let [initialValues,setInitialValues] = useState({
    category: "",
    imgurl: "",
    name: "",
    description: "",
    price: ""
  })
 

  // formik validation
  let userSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    imgurl: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.string().required("Required")
  });

  //Create new product
  const handleAddProduct = async (values) => {
    try {
      let res = await axios.post(`${url}/admin/create-product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        category: values.category,
        imgurl: values.imgurl,
        name: values.name,
        description: values.description,
        price: values.price,
      })

      if (res.status === 201) {
        toast.success(res.data.message)
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  //getting data
  let getData = async() => {
    try{
        let res = await axios.post(`${url}/admin/getSingleProduct`,{id})
        //set value for edit product and pre populate
        setInitialValues(res.data.values);

        setIsValid(true);

       }catch(error){
        console.log(error);
       }
  };


  //update data
  let updateData = async(values)=>{
    try {
        let res = await axios.put(`${url}/admin/updateProduct/${id}`,{values})

        if(res.status===201){
           toast.success(res.data.message)
            navigate("/adminHome/all-products");
        }
    } catch (error) {
        console.log(error)
    }
  }

  

  useEffect(() => {
    if(id){
      //for edit the product details
    getData();

    }else{
        setIsValid(true);
    }
  },[]);

   // Function to reset the form fields
   const resetForm = () => {
    setInitialValues({
      category: '',
      imgurl: '',
      name: '',
      description: '',
      price: '',
    });
  };


  return (
    <div>
    {/*check isValid true or false  */}
       {isValid?<Formik
        initialValues={initialValues}

        validationSchema={userSchema}

        // send entered data do handleAddProduct function
        onSubmit={async (values, { setSubmitting, resetForm }) => {
         try {
          if(id){
            //for edit product we should update data
            updateData(values) 
          }else{
            //for creating new product
            await handleAddProduct(values);
          }
          resetForm(); // Reset the form fields
          setSubmitting(false);
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || 'An error occurred');
        }
      }}
      >
        {({ errors, touched }) => (
          <div className='container-fluid d-flex justify-content-center '>
            <div className='add-products p-5'>
              <div className='login-header text-center text-danger'><p>Add Product</p></div>
              <Form>
                <div className="form-group pt-1">
                  <label htmlFor="category" className='text-white'>Category</label>
                  <Field name="category" className="form-control" type="text" placeholder="Enter category" />
                  {errors.category && touched.category ? (
                    <div style={{ color: "red" }}>{errors.category}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="imgurl" className='text-white'>Img-Url</label>
                  <Field name="imgurl" className="form-control" type="text" placeholder="Enter imgurl" />
                  {errors.imgurl && touched.imgurl ? (
                    <div style={{ color: "red" }}>{errors.imgurl}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="name" className='text-white'>Name of product</label>
                  <Field name="name" className="form-control" type="text" placeholder="Enter name " />
                  {errors.name && touched.name ? (
                    <div style={{ color: "red" }}>{errors.name}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="description" className='text-white'>description</label>
                  <Field name="description" className="form-control" type="text" placeholder="Enter description" />
                  {errors.description && touched.description ? (
                    <div style={{ color: "red" }}>{errors.description}</div>
                  ) : null}
                </div>

                <div className="form-group pt-2">
                  <label htmlFor="price" className='text-white'>price</label>
                  <Field name="price" className="form-control" type="text" placeholder="Enter price" />
                  {errors.price && touched.price ? (
                    <div style={{ color: "red" }}>{errors.price}</div>
                  ) : null}
                </div>

                <div className='d-flex justify-content-center mt-5'>
                  <Button variant="outline-secondary" type='submit'>
                    Add-Product
                  </Button>
                </div>
              </Form>
            </div>
          </div >
        )}
      </Formik>
      :
      <div style={{"textAlign":"center"}}><b>Loading...</b></div>}

    </div>
  )

}

export default AddProducts