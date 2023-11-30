import ItemContainer from "../../item-container/ItemContainer";
import Button from "../../button/Button";

const CartPage = () => {
  return (
    <div>
      <h2>Your Cart</h2>
      <ItemContainer />
      <p>Subtotal</p>
      <Button text={"Checkout"} />
    </div>
  );
};

export default CartPage;
