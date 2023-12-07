import PropTypes from "prop-types";
import Button from "../button/Button";

const Item = ({ imageUrl, itemName, itemPrice }) => {
  return (
    <div>
      <img src={imageUrl} alt={itemName} width={200} loading="lazy" />
      <p>{itemName}</p>
      <p>{itemPrice}</p>
      <input name="item-count" type="number" />
      <Button text={"-"} />
      <Button text={"+"} />
      <Button text={"Add to cart"} />
    </div>
  );
};

Item.propTypes = {
  imageUrl: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
};

export default Item;
