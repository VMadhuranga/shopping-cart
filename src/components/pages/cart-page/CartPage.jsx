import Button from "../../button/Button";
import Item from "../../item/Item";
import { useOutletContext } from "react-router-dom";
import styles from "./CartPage.module.css";
import { cartItem } from "../../item/Item.module.css";
import { pageTransition } from "../../../App.module.css";
import { primary, remove, spinner } from "../../button/Button.module.css";
import { pending } from "../../pages/products-page/ProductsPage.module.css";

const CartPage = () => {
  const { cartData, setCartData } = useOutletContext();

  function handleItemQuantityChange(e) {
    const itemId = Number(e.target.parentElement.parentElement.dataset.itemId);

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
    const itemId = Number(e.target.parentElement.parentElement.dataset.itemId);

    const updatedCartData = cartData.map((data) => {
      if (data.id === itemId && e.target.textContent === "\uFF0B") {
        data.itemQuantity += 1;
        data.subTotalPrice =
          Math.round(data.itemQuantity * data.price * 100) / 100;
      } else if (
        data.id === itemId &&
        e.target.textContent === "\uFF0D" &&
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

  function handleRemoveItem(e) {
    const itemId = Number(e.target.parentElement.dataset.itemId);
    const updatedCartData = cartData.filter((data) => data.id !== itemId);

    setCartData(updatedCartData);
  }

  function calculateTotalPrice() {
    const totalPrice = cartData.reduce(
      (acc, data) => acc + data.subTotalPrice,
      0,
    );

    return Math.round(totalPrice * 100) / 100;
  }

  return (
    <div
      className={`${styles.cartPage} ${pageTransition}`}
      data-testid="CartPage"
    >
      <h2>Your Cart</h2>
      {cartData.length > 0 ? (
        <>
          <div
            className={styles.cartItemContainer}
            data-testid="CartItemContainer"
          >
            {cartData.map((data) => (
              <Item
                key={data.id}
                itemId={data.id}
                imageUrl={data.image}
                itemName={data.title}
                itemPrice={data.price}
                subTotalPrice={data.subTotalPrice}
                className={cartItem}
                optionalElements={
                  <>
                    <div>
                      <Button
                        className={spinner}
                        text={"\uFF0B"}
                        handleClick={handleIncrementAndDecrement}
                      />
                      <input
                        type="number"
                        value={data.itemQuantity > 0 ? data.itemQuantity : ""}
                        name="quantity"
                        min={1}
                        onChange={handleItemQuantityChange}
                      />
                      <Button
                        className={spinner}
                        text={"\uFF0D"}
                        handleClick={handleIncrementAndDecrement}
                      />
                    </div>
                    <Button
                      className={remove}
                      text={"\u2715"}
                      handleClick={handleRemoveItem}
                    />
                  </>
                }
              />
            ))}
          </div>
          <div className={styles.checkout}>
            <p>
              Total <span>${calculateTotalPrice()}</span>
            </p>
            <p>
              <i>Shipping and taxes will be calculated at checkout.</i>
            </p>
            <Button className={primary} text={"Checkout"} />
          </div>
        </>
      ) : (
        <p className={pending}>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
