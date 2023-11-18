import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { url } from '../App';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/reducer/cartReducer';



function OrderedItems() {

    let email = sessionStorage.getItem('email');
    let token = sessionStorage.getItem('token');
    let [item, setItem] = useState([]);
    let navigate = useNavigate()
    let dispatch = useDispatch()

//function to receive ordered products item 
    const getOrderedItem = async () => {
        try {
            let res = await axios.post(`${url}/order/getOrder`, { email }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });


            if (res.status === 200) {
                setItem(res.data.products)
            }

        } catch (error) {
            console.log(error);
        }
    }

    //after successfully ordered the item  function to clear the cart 
    const handleClearCart = () => {
        dispatch(clearCart(0))
        navigate('/menu')
    }



    useEffect(() => {
        getOrderedItem()
    }, [])

    return (
        <div className='container-fluid your-orders'>
            <div className='text-white your-orders-title' style={{ height: '3em', backgroundColor: 'black' }}>
                <h4>Your Orders</h4>
                <Button variant="danger" className='h-1' onClick={() => handleClearCart()}>Go to Menu</Button>
            </div>

            <div>
                <Table bordered className='mt-2 text-center'>
                    <thead className='text-danger'>
                        <tr>
                            <th>S.No</th>
                            <th>Products</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Sub Total</th>
                            <th>Status</th>
                            <th>Ordered on</th>
                        </tr>
                    </thead>
                    <tbody className='text-white'>
                    {item.map((e, i) => {
    // Check if `e` is an array and not empty
    if (Array.isArray(e) && e.length > 0) {
        return (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.products}</td>
                <td>{e.qty}</td>
                <td>{e.price}</td>
                <td>{e.total_amount}</td>
                <td>{e.status}</td>
                <td>{new Date(e.createdAt).toLocaleDateString('en-UK')}</td>
            </tr>
        );
    }
})}

                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default OrderedItems;
