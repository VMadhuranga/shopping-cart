import { useOutletContext } from "react-router-dom";
import Item from "../../item/Item";

const ProductsPage = () => {
  const { data, error, loading } = useOutletContext();

  return (
    <div data-testid={"ProductsPage"}>
      <h2>Product</h2>
      {loading && <p>Loading</p>}
      {error && <p>Something went wrong</p>}
      {data && (
        <div data-testid="ItemContainer">
          {data.map((product) => (
            <Item
              key={product.id}
              imageUrl={product.image}
              itemName={product.title}
              itemPrice={product.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
