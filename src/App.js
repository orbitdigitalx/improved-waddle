import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NotFound from "./components/NotFound/NotFound";
import MenuPage from "./components/MenuPage/MenuPage";
import FoodDetails from "./components/FoodDetails/FoodDetails";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";

function App() {
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 3000);
   }, []);

   return (
      <>
         {loading ? (
            <div className="home-pre-loader">
               <div className="d-flex justify-content-center align-items-center">
                  <SyncLoader
                     className="syncloader"
                     color={"#fe9d3e"}
                     loading={loading}
                     size={20}
                  />
               </div>
            </div>
         ) : (
            <>
               <Router>
                  <Header />
                  <Switch>
                     <Route exact path="/">
                        <Main />
                     </Route>
                     <Route path="/home">
                        <Main />
                     </Route>
                     <Route path="/menus">
                        <MenuPage />
                     </Route>
                     <Route path="/menu/:menuId">
                        <FoodDetails />
                     </Route>
                     <Route path="/cart">
                        <Cart />
                     </Route>
                     <Route path="*">
                        <NotFound />
                     </Route>
                  </Switch>
                  <Footer />
               </Router>
            </>
         )}
      </>
   );
}

export default App;
