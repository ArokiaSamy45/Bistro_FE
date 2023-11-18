import React from 'react'
import axios from "axios";
import { url } from "../../App";
import { toast } from "react-toastify";
import { allProducts } from "../reducer/productReducer";
import { filterItems } from '../reducer/productReducer';

let token = sessionStorage.getItem('token')

export var fetchProducts = async (dispatch) => {
    try {

        let response = await axios.get(`${url}/product-details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        dispatch(allProducts(response.data.product))

    } catch (error) {
        console.log(error);
    }
}










