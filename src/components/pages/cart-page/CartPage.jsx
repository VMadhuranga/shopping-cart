import Button from "../../button/Button";
import Item from "../../item/Item";
import { useOutletContext } from "react-router-dom";

const CartPage = () => {
  const { cartData, setCartData } = useOutletContext();

  function handleItemQuantityChange(e) {
    const itemId = Number(e.target.parentElement.dataset.itemId);

    const updatedCartData = cartData.map((data) => {
      if (data.id === itemId) {
        data.itemQuantity = Number(e.target.value);
        data.subTotalPrice =
          Math.round(data.itemQuantity * data.price * 100) / 100;
      }

      return data;
    });

    setCartData(updatedCartData);
  }

  function handleIncrementAndDecrement(e) {
    const itemId = Number(e.target.parentElement.dataset.itemId);

    const updatedCartData = cartData.map((data) => {
      if (data.id === itemId && e.target.textContent === "+") {
        data.itemQuantity += 1;
        data.subTotalPrice =
          Math.round(data.itemQuantity * data.price * 100) / 100;
      } else if (
        data.id === itemId &&
        e.target.textContent === "-" &&
        data.itemQuantity > 1
      ) {
        data.itemQuantity -= 1;
        data.subTotalPrice =
          Math.round(data.itemQuantity * data.price * 100) / 100;
      }

      return data;
    });

    setCartData(updatedCartData);
  }

  return (
    <div data-testid="CartPage">
      <h2>Your Cart</h2>
      {cartData.length > 0 ? (
        <>
          <div data-testid="CartItemContainer">
            {cartData.map((data) => (
              <Item
                key={data.id}
                itemId={data.id}
                imageUrl={data.image}
                itemName={data.title}
                itemPrice={data.price}
                subTotalPrice={data.subTotalPrice}
                optionalElements={
                  <>
                    <input
                      type="number"
                      value={data.itemQuantity > 0 ? data.itemQuantity : ""}
                      name="quantity"
                      min={1}
                      onChange={handleItemQuantityChange}
                    />
                    <Button
                      text={"+"}
                      handleClick={handleIncrementAndDecrement}
                    />
                    <Button
                      text={"-"}
                      handleClick={handleIncrementAndDecrement}
                    />
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
