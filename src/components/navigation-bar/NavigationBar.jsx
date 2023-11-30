import { Link } from "react-router-dom";
import CartCounter from "../cart-counter/CartCounter";

const NavigationBar = () => {
  return (
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
          <CartCounter />
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
