import { useNavigate } from "react-router-dom";
import Button from "../../button/Button";
import styles from "./HomePage.module.css";
import { pageTransition } from "../../../App.module.css";
import { primary } from "../../button/Button.module.css";
import homePageBGImage from "../../../assets/images/home-page-bg.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  function navigateToProducts() {
    navigate("products");
  }

  return (
    <div
      className={`${styles.homePage} ${pageTransition}`}
      data-testid="HomePage"
    >
      <div>
        <h2>Calling all fashion lovers</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo
          explicabo fugiat numquam dignissimos accusamus quasi ipsa rem nam
          minima unde.
        </p>
        <Button
          className={primary}
          text={"Shop Now"}
          handleClick={navigateToProducts}
        />
      </div>
      <img src={homePageBGImage} alt="store front" />
    </div>
  );
};

export default HomePage;
