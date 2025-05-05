import { render } from '@testing-library/react-native';
import React from 'react';
import BudgetVisualization from '../components/BudgetVisualization';

jest.mock('react-native-circular-progress', () => {
  const { View } = require('react-native');
  return {
    AnimatedCircularProgress: ({ size, width, fill, tintColor, backgroundColor, children }: any) => (
      <View testID="mock-circular-progress">
      {children(fill)}
      </View>
    ),
  };
});

describe('BudgetVisualization Component', () => {
  it('renders "no budget" message when status is "none"', () => {
    const { getByText } = render(
      <BudgetVisualization
        totalExpenses={100}
        budget={null}
        budgetStatus="none"
      />
    );
    expect(getByText('Set a monthly budget to track your spending')).toBeTruthy();
    expect(getByText('Budget Status')).toBeTruthy(); // Title should still be there
  });

  it('renders "under budget" status correctly', () => {
    const { getByText, getByTestId } = render(
      <BudgetVisualization
        totalExpenses={800}
        budget={1000}
        budgetStatus="under"
      />
    );

    expect(getByText('Under Budget')).toBeTruthy();
    expect(getByText('$200.00 remaining')).toBeTruthy();

    const progress = getByTestId('mock-circular-progress');
    // Check text inside progress
    expect(getByText('80%')).toBeTruthy();
    expect(getByText('Spent')).toBeTruthy();
  });

  it('renders "over budget" status correctly', () => {
    const { getByText, getByTestId } = render(
      <BudgetVisualization
        totalExpenses={1200}
        budget={1000}
        budgetStatus="over"
      />
    );

    expect(getByText('Over Budget')).toBeTruthy();
    expect(getByText('$200.00 over budget')).toBeTruthy();

    const progress = getByTestId('mock-circular-progress');

    // Check text inside progress
    expect(getByText('120%')).toBeTruthy();
    expect(getByText('Spent')).toBeTruthy();
  });

   it('handles zero budget correctly (shows 0% progress if expenses exist)', () => {
     const { getByText, getByTestId } = render(
      <BudgetVisualization
        totalExpenses={50}
        budget={null} 
        budgetStatus="under" 
      />
    );

    // Assuming if budget is null, progress is 0, even if status isn't 'none'
    const progress = getByTestId('mock-circular-progress');

    // Check text inside progress
    expect(getByText('0%')).toBeTruthy();
    expect(getByText('Spent')).toBeTruthy();
  });
});
