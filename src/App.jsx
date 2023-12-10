import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetchStoreData from "./utils/store-data";
import CartCounter from "./components/cart-counter/CartCounter";

const App = () => {
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { data, error, loading } = useFetchStoreData();

  useEffect(() => {
    setCartCount(cartData.reduce((acc, data) => acc + data.itemQuantity, 0));
  }, [cartData]);

  return (
    <>
      <header>
        <h1>Shopping Cart</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="products">Products</Link>
            </li>
            <li>
              <Link to="cart">Cart</Link>
              <CartCounter count={cartCount} />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet context={{ data, error, loading, cartData, setCartData }} />
      </main>
      <footer>&copy; 2023 VMadhuranga</footer>
    </>
  );
};

export default App;
