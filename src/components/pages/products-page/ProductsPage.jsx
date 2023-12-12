import { useOutletContext } from "react-router-dom";
import Item from "../../item/Item";
import Button from "../../button/Button";
import styles from "./ProductsPage.module.css";
import { pageTransition } from "../../../App.module.css";
import { primary } from "../../button/Button.module.css";

const ProductsPage = () => {
  const {
    data: productsData,
    error,
    loading,
    cartData,
    setCartData,
  } = useOutletContext();

  function handleAddToCart(e) {
    const itemId = Number(e.target.parentElement.dataset.itemId);
    const itemData = productsData.find((product) => product.id === itemId);

    // If item already in the cart update item item quantity
    // Else add item to cart
    if (checkItemIsInTheCart(cartData, itemData.id)) {
      const updatedCartData = cartData.map((data) => {
        if (data.id === itemData.id) {
          data.itemQuantity += 1;
          data.subTotalPrice = data.itemQuantity * data.price;
        }

        return data;
      });

      setCartData(updatedCartData);
    } else {
      const itemQuantity = 1;
      const subTotalPrice = itemQuantity * itemData.price;

      setCartData([
        ...cartData,
        {
          ...itemData,
          itemQuantity,
          subTotalPrice,
        },
      ]);
    }
  }

  function checkItemIsInTheCart(cartData, itemId) {
    return cartData.some((data) => data.id === itemId);
  }

  return (
    <div
      className={`${styles.productsPage} ${pageTransition}`}
      data-testid={"ProductsPage"}
    >
      <h2>Shop our latest products</h2>
      {loading && <p>Loading</p>}
      {error && <p>Something went wrong</p>}
      {productsData && (
        <div className={styles.itemContainer} data-testid="ItemContainer">
          {productsData.map((product) => (
            <Item
              key={product.id}
              itemId={product.id}
              imageUrl={product.image}
              itemName={product.title}
              itemPrice={product.price}
              optionalElements={
                <Button
                  className={primary}
                  text={"Add to cart"}
                  handleClick={handleAddToCart}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
