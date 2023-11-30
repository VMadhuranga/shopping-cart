import PropTypes from "prop-types";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
};
