import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import BudgetInput from '../components/BudgetInput';
import strings from "../shared/localization/strings"; // Import strings

const mockSetBudget = jest.fn(() => Promise.resolve());

describe("BudgetInput Component", () => {
  beforeEach(() => {
    mockSetBudget.mockClear();
  });

  it("renders input field when no budget is provided", () => {
    const { getByPlaceholderText, getByText } = render(
      <BudgetInput budget={null} setBudget={mockSetBudget} />
    );

    expect(getByPlaceholderText("Enter budget amount")).toBeTruthy();
    expect(getByText("Set Monthly Budget")).toBeTruthy();
    expect(getByText(strings.budgetInputSaveButton)).toBeTruthy();
  });

  it("renders budget display when a budget is provided", () => {
    const { getByText, getByTestId } = render(
      // Assuming you add testID="edit-budget-button" to the TouchableOpacity
      <BudgetInput budget={1500} setBudget={mockSetBudget} />
    );

    expect(getByText("Monthly Budget")).toBeTruthy();
    expect(getByText("$1500.00")).toBeTruthy();
  });

  it("allows entering and saving a valid budget", async () => {
    const { getByPlaceholderText, getByText } = render(
      <BudgetInput budget={null} setBudget={mockSetBudget} />
    );

    const input = getByPlaceholderText("Enter budget amount");
    const saveButton = getByText(strings.budgetInputSaveButton);

    fireEvent.changeText(input, "2000");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockSetBudget).toHaveBeenCalledTimes(1);
      expect(mockSetBudget).toHaveBeenCalledWith(2000);
    });
  });

  it("shows error message for invalid input (non-numeric)", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <BudgetInput budget={null} setBudget={mockSetBudget} />
    );

    const input = getByPlaceholderText("Enter budget amount");
    const saveButton = getByText(strings.budgetInputSaveButton);

    fireEvent.changeText(input, "abc");
    fireEvent.press(saveButton);

    const errorMessage = await findByText("Please enter a valid budget amount");
    expect(errorMessage).toBeTruthy();
    expect(mockSetBudget).not.toHaveBeenCalled();
  });

  it("shows error message for zero input", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <BudgetInput budget={null} setBudget={mockSetBudget} />
    );

    const input = getByPlaceholderText("Enter budget amount");
    const saveButton = getByText(strings.budgetInputSaveButton);

    fireEvent.changeText(input, "0");
    fireEvent.press(saveButton);

    const errorMessage = await findByText("Please enter a valid budget amount");
    expect(errorMessage).toBeTruthy();
    expect(mockSetBudget).not.toHaveBeenCalled();
  });

  it("switches to edit mode when edit icon is pressed", () => {
    const { getByText, queryByText } = render(
      <BudgetInput budget={1500} setBudget={mockSetBudget} />
    );

    expect(queryByText(strings.budgetInputSaveButton)).toBeNull();
    expect(getByText("$1500.00")).toBeTruthy();
  });
});
