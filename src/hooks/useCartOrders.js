import { useEffect, useState } from "react";

const useCartOrders = () => {
   const [cartOrders, setCartOrders] = useState([]);

   useEffect(() => {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartOrders(existingCart);
   }, []);

   return [cartOrders, setCartOrders];
};

export default useCartOrders;
