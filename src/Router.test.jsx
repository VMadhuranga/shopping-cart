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
