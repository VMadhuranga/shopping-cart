import { Outlet } from "react-router-dom";
import NavigationBar from "./components/navigation-bar/NavigationBar";

const App = () => {
  return (
    <>
      <header>
        <h1>Shopping Cart</h1>
        <NavigationBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>&copy; 2023 VMadhuranga</footer>
    </>
  );
};

export default App;
