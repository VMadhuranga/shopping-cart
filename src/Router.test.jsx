import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Router from "./Router";

describe("Router component", () => {
  const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return {
      user: userEvent.setup(),
      ...render(ui),
    };
  };

  it("Render HomePage component in main section when Home link clicked", async () => {
    const user = userEvent.setup();

    renderWithRouter(<Router />);

    await user.click(screen.getByRole("link", { name: "Home" }));

    expect(screen.getByTestId("HomePage")).toBeInTheDocument();
  });

  it("Render ProductsPage component in main section when Products link clicked", async () => {
    const user = userEvent.setup();

    renderWithRouter(<Router />, { route: "products" });

    await user.click(screen.getByRole("link", { name: "Products" }));

    expect(screen.getByTestId("ProductsPage")).toBeInTheDocument();
  });

  it("Render CartPage component in main section when Cart link clicked", async () => {
    const user = userEvent.setup();

    renderWithRouter(<Router />, { route: "cart" });

    await user.click(screen.getByRole("link", { name: "Cart" }));

    expect(screen.getByTestId("CartPage")).toBeInTheDocument();
  });

  it("Render ProductPage component in main section when Shop Now button clicked", async () => {
    const user = userEvent.setup();

    renderWithRouter(<Router />);

    await user.click(screen.getByRole("button", { name: "Shop Now" }));

    expect(screen.getByTestId("ProductsPage")).toBeInTheDocument();
  });

  it("Render ErrorPage component when goes to wrong route path", () => {
    renderWithRouter(<Router />, { route: "badpage" });

    expect(screen.getByTestId("ErrorPage")).toBeInTheDocument();
  });

  it("Render HomePage component when Go back to Home link in error page clicked", async () => {
    const user = userEvent.setup();

    renderWithRouter(<Router />, { route: "badpage" });

    await user.click(screen.getByRole("link", { name: "Home" }));

    expect(screen.getByTestId("HomePage")).toBeInTheDocument();
  });
});
