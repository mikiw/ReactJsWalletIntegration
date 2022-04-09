import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders ETH Balance", () => {
  render(<App />);
  expect(screen.getByText("ETH Balance")).toBeInTheDocument();
});

it("renders SDK Balance", () => {
  render(<App />);
  expect(screen.getByText("Cosmos SDK Balance")).toBeInTheDocument();
});

test("check MetaMask button", ()=> {
  const { getByTestId } = render(<App />);
  const button = getByTestId("meta-mask-button");
  expect(button).toBeInTheDocument();
});

test("check Keplr button", ()=> {
  const { getByTestId } = render(<App />);
  const button = getByTestId("keplr-button");
  expect(button).toBeInTheDocument();
});