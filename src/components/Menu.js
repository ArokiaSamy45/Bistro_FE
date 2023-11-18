import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import Navigation from "./Navigation";
import { Button } from "react-bootstrap";
import { addToCart, setCart } from "../redux/reducer/cartReducer";
import { fetchProducts } from "../redux/action/productAction";

function Menu() {
  let [value, setValue] = useState(1);

  //redux hook to dispatch action
  let dispatch = useDispatch();

  //redux hook to get data
  let values = useSelector((state) => state.product);

  // console.log(values);

  //prepopulate products details while this page after loading
  useEffect(() => {
    fetchProducts(dispatch);
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(setCart(storedCart));
  }, [dispatch]);

  //function for addToCart send product details store data in addToCart redux storage

  const handleAddToCart = (product, quantity) => {
    console.log(`Adding to Cart: ${product.name} - Price: $${product.price}`);
    dispatch(
      addToCart({
        e: product, // Adjust this to match your expected payload structure
        price: quantity * product.price,
        value: quantity,
      })
    );
  };

  return (
    <>
      <div className="fixed-top">
        {" "}
        <Navigation />
      </div>
      {/* <div className='filter-menu'> <Filter /></div> */}
      <div className="menu-body">
        <div className="">
          <div className="container-fluid px-4 px-lg-5 mt-5">
            <div className="card-header">
              {
                //using map to display the products details
                values.products.map((e, i) => {
                  return (
                    <div className="col mb-5 mt-5" key={i}>
                      <div
                        className="card"
                        style={{ height: "38em", width: "19em" }}
                      >
                        <img
                          className="card-img-top img-fluid"
                          src={e.imgurl}
                          alt="..."
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                        <div className="card-body p-2">
                          <div className="text-center">
                            <h5 className="fw-bolder">{e.name}</h5>
                          </div>
                          <hr />
                          <div
                            className="text-center"
                            style={{ maxHeight: "7em", overflowY: "scroll" }}
                          >
                            {e.description}
                          </div>
                          <hr />
                          <div className="text-center">
                            <FaRupeeSign />
                            <b>{e.price}</b>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-around">
                            <div>
                              Qty-
                              <select
                                onChange={(e) => setValue(e.target.value)}
                                style={{
                                  backgroundColor: "rgb(232, 61, 61)",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "5px",
                                }}
                              >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer border-top-0 bg-transparent">
                          <div className="text-center">
                            <Button
                              variant="outline-success"
                              onClick={() => handleAddToCart(e, value)} // Pass the product and quantity
                            >
                              Add To cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>
                Copyright © {new Date().getFullYear()}. All rights are reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Menu;
