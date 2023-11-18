import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRupeeSign } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { deleteCart } from '../redux/reducer/cartReducer';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import axios from 'axios';
import { url } from '../App';
import { setCart } from '../redux/reducer/cartReducer';


function AddToCart() {

  const cartProducts = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  useEffect(() => {
    // Retrieve cart from localStorage on component mount
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(setCart(storedCart));
  }, [dispatch]);


  // console.log(cartProducts );

 // Razorpay function to handle payment
const handleOpenRazorpay = (data) => {
  const options = {
    key: 'rzp_test_74zya6whmuzlxs',
    amount: data.amount, 
    currency: data.currency,
    name: 'SeaView-Bistro',
    description: 'XYZ',
    order_id: data.id,
    handler: async function (response) {
      try {
        let res = await axios.post(`${url}/payment/verify`, { response });

        if (res.status === 200) {
          navigate('/success');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  // Initialize the Razorpay object and open the payment dialog
  const rzp = new window.Razorpay(options);
  rzp.open();
};

// Function to initiate the payment
const handlePayment = async () => {
  if (cartProducts.cartTotalQuantity > 0) {
    const amount = cartProducts.cartTotalAmount;

    try {
      // Make a POST request to create an order
      let res = await axios.post(`${url}/payment/order`, { amount });

      // Call the handleOpenRazorpay function with the order data
      handleOpenRazorpay(res.data.order);
    } catch (error) {
      console.error(error);
    }
  } else {
    toast.error('Please add a product');
  }
};
// console.log("cartProducts.cartItems:", cartProducts.cartItems);




  return (
    <div className='container-fluid cart-header'>
      <div className='cart-title bg-dark'>
        CheckOut
      </div>
      <div className='cart-total text-center p-4 mt-3'>
        <h4>Cart Amount</h4>
        <p className="mb-3">
          Total Amount:<br />
          <b><FaRupeeSign />{cartProducts.cartTotalAmount}</b>
        </p>
        <Button variant='success' onClick={() => handlePayment()}>Pay Now</Button>
      </div>
      <div className='cart-item'>
        {
       
          cartProducts.cartItems.map((cart,i) => {
            console.log(cartProducts.cartItems)
            return (
              <div className="d-flex justify-content-center mt-3" key={i}>
             <div className="card mb-3" style={{ maxWidth: "700px", borderRadius: "1em" }}>
  <div className="row no-gutters">
    <div className="col-12">
      <img src={cart.e.imgurl} alt="Product" className="img-fluid" style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          borderTopLeftRadius: "1em",
          borderTopRightRadius: "1em",
        }} />
    </div>
    <div className="col-12 col-md-8" style={{ padding: "10px" }}>
      <div className="card-body">
        <h5 className="card-title pt-2"><b>{cart.e.name}</b></h5>
        <p className="card-text pt-3">
          <FaRupeeSign />
          <b>{cart.e.price}</b>
        </p>
      </div>
      <div className="d-flex">
        <div className='d-flex'>
          <b className="amount-cart">Qty = {cart.value}</b>{" "}
          <b className="amount-cart">Amount = {cart.price}</b>
        </div>
        <div>
          <Button
            variant="danger"
            size="small"
            onClick={() => dispatch(deleteCart({ index: i, price: cart.price }))}
          >
            Remove <RiDeleteBin5Line />
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>

            </div>
            
            
            )
          })
        }
      </div>
    </div>
  )
}

export default AddToCart
