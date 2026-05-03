import React, { useEffect, useState } from "react";
import PageBanner from "../PageBanner/PageBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useCartOrders from "../../hooks/useCartOrders";
import "./Cart.scss";

const Cart = () => {
   const [cartOrders, setCartOrders] = useCartOrders();
   const [totalQuantity, setTotalQuantity] = useState(0);
   const [subTotal, setSubTotal] = useState(0);
   const [tax, setTax] = useState(0);

   useEffect(() => {
      const price = cartOrders.reduce(
         (prev, order) =>
            prev + parseInt(order.price) * parseInt(order.quantity),
         0
      );
      const quantity = cartOrders.reduce(
         (prev, order) => prev + parseInt(order.quantity),
         0
      );
      const tax = price * 0.07;
      setSubTotal(price);
      setTotalQuantity(quantity);
      setTax(Math.round(tax));
   }, [cartOrders]);

   const handleDelete = (id) => {
      const proceed = window.confirm("Are you sure you want to delete");
      if (proceed) {
         const remaining = cartOrders.filter((order) => order._id !== id);
         setCartOrders(remaining);
         localStorage.setItem('cart', JSON.stringify(remaining));
      }
   };

   return (
      <>
         <PageBanner>
            <span>cart</span>
         </PageBanner>
         <div className="cart">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <h4>Food cart</h4>
                     <div className="cart-table">
                        <table className="table mb-0">
                           <thead>
                              <tr>
                                 <th scope="col">Item</th>
                                 <th scope="col">Item name</th>
                                 <th scope="col">Price</th>
                                 <th scope="col">Quantity</th>
                                 <th scope="col">Sub Total</th>
                                 <th scope="col">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {cartOrders.map((order) => (
                                 <tr key={order._id}>
                                    <td>
                                       <img
                                          className="img-fluid"
                                          src={order.image}
                                          alt=""
                                          style={{ width: '80px' }}
                                       />
                                    </td>
                                    <td>
                                       <p>{order.menu}</p>
                                    </td>
                                    <td>
                                       <p>${order.price}</p>
                                    </td>
                                    <td>
                                       <p>{order.quantity}</p>
                                    </td>
                                    <td>
                                       <p>${order.price * order.quantity}</p>
                                    </td>
                                    <td>
                                       <p>
                                          <button
                                             onClick={() =>
                                                handleDelete(order._id)
                                             }
                                             className="btn-black delete"
                                          >
                                             <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                className="fa-icon"
                                             />
                                          </button>
                                       </p>
                                    </td>
                                 </tr>
                              ))}
                              {cartOrders.length === 0 && (
                                 <tr>
                                    <td colSpan="6">
                                       <p className="text-center py-4">Your cart is empty!</p>
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               
               {cartOrders.length > 0 && (
                  <div className="row mt-4 justify-content-end">
                     <div className="col-md-4">
                        <div className="cart-totals p-4 bg-light shadow-sm">
                           <h5>Order Summary</h5>
                           <hr />
                           <div className="d-flex justify-content-between mb-2">
                              <span>Total Quantity:</span>
                              <span>{totalQuantity}</span>
                           </div>
                           <div className="d-flex justify-content-between mb-2">
                              <span>Subtotal:</span>
                              <span>${subTotal}</span>
                           </div>
                           <div className="d-flex justify-content-between mb-2">
                              <span>Tax (7%):</span>
                              <span>${tax}</span>
                           </div>
                           <hr />
                           <div className="d-flex justify-content-between mb-3">
                              <strong>Total:</strong>
                              <strong>${subTotal + tax}</strong>
                           </div>
                           <button className="btn-black w-100 py-2" onClick={() => alert('Order placed! (Static Demo)')}>
                              Proceed to Checkout
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default Cart;
