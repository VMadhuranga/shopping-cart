import Button from "../button/Button";

const Item = () => {
  return (
    <div>
      <img src="/" alt="/" />
      <p>Item Name</p>
      <p>Item Description</p>
      <p>Item Price</p>
      <input type="number" />
      <Button text={"-"} />
      <Button text={"+"} />
      <Button text={"Add to cart"} />
    </div>
  );
};

export default Item;
