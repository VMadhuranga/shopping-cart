import PropTypes from "prop-types";
import styles from "./CartCounter.module.css";

const CartCounter = ({ count }) => {
  return (
    <span className={styles.counter} data-testid={"CartCounter"}>
      {count}
    </span>
  );
};

CartCounter.propTypes = {
  count: PropTypes.number,
};

export default CartCounter;
