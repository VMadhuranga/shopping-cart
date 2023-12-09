import Button from "../../button/Button";
import Item from "../../item/Item";
import { useOutletContext } from "react-router-dom";

const CartPage = () => {
  const { cartData } = useOutletContext();

  return (
    <div data-testid="CartPage">
      <h2>Your Cart</h2>
      {cartData.length > 0 ? (
        <>
          <div data-testid="CartItemContainer">
            {cartData.map((data) => (
              <Item
                key={data.id}
                imageUrl={data.image}
                itemName={data.title}
                itemPrice={data.price}
                subTotalPrice={data.subTotalPrice}
                optionalElements={
                  <>
                    <input
                      type="number"
                      value={data.itemQuantity}
                      name="quantity"
                    />
                    <Button text={"+"} />
                    <Button text={"-"} />
                    <Button text={"x"} />
                  </>
                }
              />
            ))}
          </div>
          <p>Total</p>
          <Button text={"Checkout"} />
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
