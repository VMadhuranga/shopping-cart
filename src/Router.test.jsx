import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import renderWithRouter from "../tests/utils/render-with-router";
import mockStoreData from "../tests/utils/mock-store-data";
import mockUseFetchStoreData from "../tests/utils/mock-use-fetch-store-data";
import Router from "./Router";

describe("Test Routing", () => {
  it("Render HomePage component in main section when Home link clicked", async () => {
    const { user } = renderWithRouter(<Router />);

    await user.click(screen.getByRole("link", { name: "Home" }));

    expect(screen.getByTestId("HomePage")).toBeInTheDocument();
  });

  it("Render ProductsPage component in main section when Products link clicked", async () => {
    const { user } = renderWithRouter(<Router />, { route: "products" });

    await user.click(screen.getByRole("link", { name: "Products" }));

    expect(screen.getByTestId("ProductsPage")).toBeInTheDocument();
  });

  it("Render CartPage component in main section when Cart link clicked", async () => {
    const { user } = renderWithRouter(<Router />, { route: "cart" });

    await user.click(screen.getByRole("link", { name: "Cart" }));

    expect(screen.getByTestId("CartPage")).toBeInTheDocument();
  });

  it("Render ProductPage component in main section when Shop Now button clicked", async () => {
    const { user } = renderWithRouter(<Router />);

    await user.click(screen.getByRole("button", { name: "Shop Now" }));

    expect(screen.getByTestId("ProductsPage")).toBeInTheDocument();
  });

  it("Render ErrorPage component when goes to wrong route path", () => {
    renderWithRouter(<Router />, { route: "badpage" });

    expect(screen.getByTestId("ErrorPage")).toBeInTheDocument();
  });

  it("Render HomePage component when Go back to Home link in error page clicked", async () => {
    const { user } = renderWithRouter(<Router />, { route: "badpage" });

    await user.click(screen.getByRole("link", { name: "Home" }));

    expect(screen.getByTestId("HomePage")).toBeInTheDocument();
  });
});

describe("Test data fetching", () => {
  it("Shows loading status while fetching data", () => {
    mockUseFetchStoreData(null, null, true);

    renderWithRouter(<Router />, { route: "products" });

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("Shows a message if something went wrong", () => {
    mockUseFetchStoreData(null, new Error("Async error"), false);

    renderWithRouter(<Router />, { route: "products" });

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("Shows fetched store data", () => {
    mockUseFetchStoreData(mockStoreData, null, false);

    renderWithRouter(<Router />, { route: "products" });

    expect(screen.getByTestId("ItemContainer")).toBeInTheDocument();
  });
});

describe.only("Test page functionality", () => {
  it("Add first item to the cart when Add to cart button clicked", async () => {
    mockUseFetchStoreData(mockStoreData, null, false);

    const { user } = renderWithRouter(<Router />, { route: "products" });

    const addToCartButtons = screen.getAllByRole("button", {
      name: "Add to cart",
    });

    await user.click(addToCartButtons.at(0));
    await user.click(screen.getByRole("link", { name: "Cart" }));

    expect(screen.getByRole("img", { name: "T-Shirt 1" })).toBeInTheDocument();
    expect(screen.getByText("T-Shirt 1")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText(/Sub Total/i)).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(Number(screen.getByRole("spinbutton").value)).toBe(1);
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "x" })).toBeInTheDocument();
  });

  it("Add second item to the cart when Add to cart button clicked", async () => {
    mockUseFetchStoreData(mockStoreData, null, false);

    const { user } = renderWithRouter(<Router />, { route: "products" });

    const addToCartButtons = screen.getAllByRole("button", {
      name: "Add to cart",
    });

    await user.click(addToCartButtons.at(1));
    await user.click(screen.getByRole("link", { name: "Cart" }));

    expect(screen.getByRole("img", { name: "T-Shirt 2" })).toBeInTheDocument();
    expect(screen.getByText("T-Shirt 2")).toBeInTheDocument();
    expect(screen.getByText("$15")).toBeInTheDocument();
    expect(screen.getByText(/Sub Total/i)).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(Number(screen.getByRole("spinbutton").value)).toBe(1);
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "x" })).toBeInTheDocument();
  });

  it("Add all items to the cart when all Add to cart button clicked", async () => {
    mockUseFetchStoreData(mockStoreData, null, false);

    const { user } = renderWithRouter(<Router />, { route: "products" });

    const addToCartButtons = screen.getAllByRole("button", {
      name: "Add to cart",
    });

    addToCartButtons.forEach(async (button) => {
      await user.click(button);
    });

    await user.click(screen.getByRole("link", { name: "Cart" }));

    expect(screen.getByTestId("CartItemContainer")).toBeInTheDocument();
  });

  it("If same item add again to cart increment the item quantity", async () => {
    mockUseFetchStoreData(mockStoreData, null, false);

    const { user } = renderWithRouter(<Router />, { route: "products" });

    const addToCartButtons = screen.getAllByRole("button", {
      name: "Add to cart",
    });

    await user.click(addToCartButtons.at(0));
    await user.click(addToCartButtons.at(0));
    await user.click(addToCartButtons.at(0));

    await user.click(screen.getByRole("link", { name: "Cart" }));
    const itemQuantity = Number(screen.getByRole("spinbutton").value);

    expect(itemQuantity).toBe(3);
  });

  it("If same item add again to cart update the item sub total", async () => {
    mockUseFetchStoreData(mockStoreData, null, false);

    const { user } = renderWithRouter(<Router />, { route: "products" });

    const addToCartButtons = screen.getAllByRole("button", {
      name: "Add to cart",
    });

    // Item 1's price is 10
    await user.click(addToCartButtons.at(0));
    await user.click(addToCartButtons.at(0));
    await user.click(addToCartButtons.at(0));

    await user.click(screen.getByRole("link", { name: "Cart" }));
    const itemSubTotal = Number(
      screen
        .getByText(/Sub Total/i)
        .textContent.match(/\d/g)
        .join(""),
    );

    expect(itemSubTotal).toBe(30);
  });

  it("Update cart count when new item added to cart or item quantity increases", async () => {
    mockUseFetchStoreData(mockStoreData, null, false);

    const { user } = renderWithRouter(<Router />, { route: "products" });

    const addToCartButtons = screen.getAllByRole("button", {
      name: "Add to cart",
    });

    await user.click(addToCartButtons.at(0));
    await user.click(addToCartButtons.at(0));
    await user.click(addToCartButtons.at(0));

    const cartCount = Number(screen.getByTestId("CartCounter").textContent);

    expect(cartCount).toBe(3);
  });

  it("Update value in input field when manually input value", async () => {
    mockUseFetchStoreData(mockStoreData, null, false);

    const { user } = renderWithRouter(<Router />, { route: "products" });

    const addToCartButtons = screen.getAllByRole("button", {
      name: "Add to cart",
    });

    await user.click(addToCartButtons.at(0));

    await user.click(screen.getByRole("link", { name: "Cart" }));

    await user.click(screen.getByRole("spinbutton"));
    await user.clear(screen.getByRole("spinbutton"));
    await user.keyboard("33");

    const itemQuantity = Number(screen.getByRole("spinbutton").value);

    console.log(itemQuantity);
    expect(itemQuantity).toBe(33);
  });
});
