import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AllOrders() {

  let [item, setItem] = useState([])
  let token = sessionStorage.getItem('token')

  //function for getting all orders
  const getProduct = async () => {
    let res = await axios.get(`${url}/admin/getOrder`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.status === 200) {
      // received date updated in state of array
      setItem(res.data.products)
    }else{
      toast.error("admin only")
    }
    
  }


  useEffect(() => {
    getProduct()
  }, [])


  return (
    <div className='text-white'>
    <div className='text-center text-danger'><h4>All Orders</h4></div>
    <div className='all-orders p-2'>
        <div className="table-wrapper">
            <Table bordered className='mt-2 text-center'>
                <thead className='text-danger'>
                    <tr>
                        <th>S.No</th>
                        <th>Order id</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Ordered on</th>
                    </tr>
                </thead>
                <tbody className='text-white'>
                    {item.map((e, i) => {
                        // Check if 'e' is not an empty array
                        if (e !== []) {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e._id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.products}</td>
                                    <td>{e.qty}</td>
                                    <td>{e.price}</td>
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
</div>

  )
}

export default AllOrders;
