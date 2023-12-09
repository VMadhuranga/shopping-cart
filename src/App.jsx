import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import useFetchStoreData from "./utils/store-data";

const App = () => {
  const [cartData, setCartData] = useState([]);
  const { data, error, loading } = useFetchStoreData();

  return (
    <>
      <header>
        <h1>Shopping Cart</h1>
        <NavigationBar />
      </header>
      <main>
        <Outlet context={{ data, error, loading, cartData, setCartData }} />
      </main>
      <footer>&copy; 2023 VMadhuranga</footer>
    </>
  );
};

export default App;
