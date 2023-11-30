import { useNavigate } from "react-router-dom";
import Button from "../../button/Button";

const HomePage = () => {
  const navigate = useNavigate();

  function navigateToProducts() {
    navigate("products");
  }

  return (
    <div>
      <h2>Calling all fashion lovers</h2>
      <Button text={"Shop Now"} handleClick={navigateToProducts} />
    </div>
  );
};

export default HomePage;
