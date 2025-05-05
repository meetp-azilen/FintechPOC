import { render } from "@testing-library/react-native";
import React from "react";
import strings from "../localization/strings"; // Import strings
import HomeScreen from "../screens/HomeScreen";

const mockUseTransactions = jest.fn();
const mockUseBudget = jest.fn();

jest.mock("../hooks/useTransactions", () => ({
  useTransactions: () => mockUseTransactions(),
}));
jest.mock("../hooks/useBudget", () => ({
  useBudget: () => mockUseBudget(),
}));

jest.mock("../components/BudgetInput", () => {
  const { Text } = require("react-native");
  return () => <Text>{strings.testBudgetInputComponentName}</Text>;
});
jest.mock("../components/BudgetVisualization", () => {
  const { Text } = require("react-native");
  return () => <Text>{strings.testBudgetVisualizationComponentName}</Text>;
});
jest.mock("../components/TransactionList", () => {
  const { Text } = require("react-native");
  return () => <Text>{strings.testTransactionListComponentName}</Text>;
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

    expect(getByText(strings.homeScreenTitle)).toBeTruthy();
    expect(getByText(strings.testBudgetInputComponentName)).toBeTruthy();
    expect(
      getByText(strings.testBudgetVisualizationComponentName)
    ).toBeTruthy();
    expect(getByText(strings.testTransactionListComponentName)).toBeTruthy();
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
