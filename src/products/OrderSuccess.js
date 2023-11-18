import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { url } from '../App';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/reducer/cartReducer';

function SuccessOrder() {

    let orders = useSelector((state) => state.cart)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    
    let orderValues = orders.cartItems.map((value) => {
        return ((value.e.name))
    })

    let orderPrice =  orders.cartItems.map((value) => {
        return ((value.price))
    })

    let orderQty =  orders.cartItems.map((value) => {
        return ((value.value))
    })


    let name = sessionStorage.getItem('name')
    let email = sessionStorage.getItem('email')
    let token = sessionStorage.getItem('token')
    let product = orderValues.toString()//get string value
    let price= orderPrice.toString()
    let Qty = orderQty.toString()
    let toatalAmount = orders.cartTotalAmount;

   //function to save details to ordered collection
    let saveOrder = async () => {
        try {
            let res = await axios.post(`${url}/order/saveOrder`, {
                products: product,
                price:price,
                name: name,
                email: email,
                qty: Qty,
               total_amount:toatalAmount
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                   }
            });

        } catch (error) {
            console.log(error);
        }
    }

    //used to call the function while this page before loading
       useEffect(()=>{
            saveOrder()
       },[])


    return (
        <div className='container-fluid order-success '>
            <div>
            <h2>Order placed successfully</h2>
            <Button variant="success" onClick={()=>navigate('/orders')}>Go to Orders</Button>
            </div>
        </div>
    )
}

export default SuccessOrder
