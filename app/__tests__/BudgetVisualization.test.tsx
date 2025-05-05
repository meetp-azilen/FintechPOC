import { render } from '@testing-library/react-native';
import React from 'react';
import BudgetVisualization from '../components/BudgetVisualization';
import strings from "../localization/strings"; // Import strings

jest.mock("react-native-circular-progress", () => {
  const { View } = require("react-native");
  return {
    AnimatedCircularProgress: ({ fill, children }: any) => (
      <View testID="mock-circular-progress">{children(fill)}</View>
    ),
  };
});

describe("BudgetVisualization Component", () => {
  it('renders "no budget" message when status is "none"', () => {
    const { getByText } = render(
      <BudgetVisualization
        totalExpenses={100}
        budget={null}
        budgetStatus="none"
      />
    );
    expect(getByText(strings.budgetVisPromptSetBudget)).toBeTruthy();
    expect(getByText(strings.budgetVisTitle)).toBeTruthy(); // Title should still be there
  });

  it('renders "under budget" status correctly', () => {
    const { getByText, getByTestId } = render(
      <BudgetVisualization
        totalExpenses={800}
        budget={1000}
        budgetStatus="under"
      />
    );

    expect(getByText(strings.budgetVisStatusUnder)).toBeTruthy();
    expect(
      getByText(`$200.00${strings.budgetVisRemainingSuffix}`)
    ).toBeTruthy();

    const progress = getByTestId("mock-circular-progress");
    // Check text inside progress
    expect(getByText(`80${strings.budgetVisPercentageSymbol}`)).toBeTruthy();
    expect(getByText(strings.budgetVisSpentLabel)).toBeTruthy();
  });

  it('renders "over budget" status correctly', () => {
    const { getByText, getByTestId } = render(
      <BudgetVisualization
        totalExpenses={1200}
        budget={1000}
        budgetStatus="over"
      />
    );

    expect(getByText(strings.budgetVisStatusOver)).toBeTruthy();
    expect(
      getByText(`$200.00${strings.budgetVisOverBudgetSuffix}`)
    ).toBeTruthy();

    const progress = getByTestId("mock-circular-progress");

    // Check text inside progress
    expect(getByText(`120${strings.budgetVisPercentageSymbol}`)).toBeTruthy();
    expect(getByText(strings.budgetVisSpentLabel)).toBeTruthy();
  });

  it("handles zero budget correctly (shows 0% progress if expenses exist)", () => {
    const { getByText, getByTestId } = render(
      <BudgetVisualization
        totalExpenses={50}
        budget={null}
        budgetStatus="under" // This scenario might be tricky depending on component logic
      />
    );

    // Assuming if budget is null, progress is 0, even if status isn't 'none'
    const progress = getByTestId("mock-circular-progress");

    // Check text inside progress - Assuming 0% when budget is null
    expect(getByText(`0${strings.budgetVisPercentageSymbol}`)).toBeTruthy();
    expect(getByText(strings.budgetVisSpentLabel)).toBeTruthy();
  });
});
