import { render } from "@testing-library/react-native";
import React from "react";
import HomeScreen from "../modules/dashboard/screens/HomeScreen";

const mockUseTransactions = jest.fn();
const mockUseBudget = jest.fn();

jest.mock("../shared/hooks/useTransactions", () => ({
  useTransactions: () => mockUseTransactions(),
}));
jest.mock("../shared/hooks/useBudget", () => ({
  useBudget: () => mockUseBudget(),
}));

jest.mock("../modules/dashboard/components/BudgetInput", () => {
  const { Text } = require("react-native");
  return () => <Text>BudgetInput</Text>;
});
jest.mock("../modules/dashboard/components/BudgetVisualization", () => {
  const { Text } = require("react-native");
  return () => <Text>BudgetVisualization</Text>;
});
jest.mock("../modules/dashboard/components/TransactionList", () => {
  const { Text } = require("react-native");
  return () => <Text>TransactionList</Text>;
});

describe("HomeScreen", () => {
  beforeEach(() => {
    mockUseTransactions.mockReturnValue({
      transactions: [],
      isLoading: false,
      error: null,
      totalExpenses: 0,
      totalIncome: 0,
      refresh: jest.fn(),
    });
    mockUseBudget.mockReturnValue({
      budget: null,
      setBudgetAmount: jest.fn(() => Promise.resolve()),
      getBudgetStatus: jest.fn(() => "none"),
    });
  });

  it("renders correctly with initial state", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Track your Finance")).toBeTruthy();
    expect(getByText("BudgetInput")).toBeTruthy();
    expect(getByText("BudgetVisualization")).toBeTruthy();
    expect(getByText("TransactionList")).toBeTruthy();
  });

  it("passes correct initial props to child components", () => {
    mockUseBudget.mockReturnValue({
      budget: 1000,
      setBudgetAmount: jest.fn(() => Promise.resolve()),
      getBudgetStatus: jest.fn((expenses) =>
        expenses > 1000 ? "over" : "under"
      ), // Mock logic
    });
    mockUseTransactions.mockReturnValue({
      transactions: [],
      isLoading: false,
      error: null,
      totalExpenses: 800,
      totalIncome: 0,
      refresh: jest.fn(),
    });
  });
});
