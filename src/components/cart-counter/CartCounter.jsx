import PropTypes from "prop-types";

const CartCounter = ({ count }) => {
  return <span data-testid={"CartCounter"}>{count}</span>;
};

CartCounter.propTypes = {
  count: PropTypes.number,
};

export default CartCounter;
