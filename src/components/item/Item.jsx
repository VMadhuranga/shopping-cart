import PropTypes from "prop-types";

const Item = ({
  itemId,
  imageUrl,
  itemName,
  itemPrice,
  subTotalPrice = null,
  optionalElements = null,
  className,
}) => {
  return (
    <div className={className} data-item-id={itemId}>
      <img src={imageUrl} alt={itemName} width={200} loading="lazy" />
      <p>{itemName}</p>
      <p>${itemPrice}</p>
      {optionalElements}
      {subTotalPrice > 0 && <p>Sub Total ${subTotalPrice}</p>}
    </div>
  );
};

Item.propTypes = {
  itemId: PropTypes.number,
  imageUrl: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
  subTotalPrice: PropTypes.number,
  optionalElements: PropTypes.element,
  className: PropTypes.string,
};

export default Item;
