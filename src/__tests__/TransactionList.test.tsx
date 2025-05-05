import { render, within } from '@testing-library/react-native'; // Import 'within'
import React from 'react';
import TransactionList from "../modules/dashboard/components/TransactionList";
import { Transaction } from "../shared/api/transactionApi"; // Adjust path
import strings from "../shared/localization/strings"; // Import strings

const mockOnRefresh = jest.fn();

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2025-04-26T10:00:00Z",
    amount: 50,
    type: "expense",
    category: "Food",
    description: "Lunch",
  },
  {
    id: "2",
    date: "2025-04-25T14:00:00Z",
    amount: 1000,
    type: "income",
    category: "Salary",
    description: "Paycheck",
  },
];

jest.mock("../modules/dashboard/components/TransactionItem", () => {
  const { View, Text } = require("react-native");
  return (props: { transaction: Transaction }) => (
    <View testID="transaction-item">
      <Text>{props.transaction.id}</Text>
    </View>
  );
});

describe("TransactionList Component", () => {
  beforeEach(() => {
    mockOnRefresh.mockClear();
  });

  it("shows loading indicator when loading initially", () => {
    const { getByText, queryByTestId } = render(
      <TransactionList
        transactions={[]}
        isLoading={true}
        error={null}
        onRefresh={mockOnRefresh}
      />
    );
    expect(getByText(strings.loadingTransactions)).toBeTruthy();
    expect(queryByTestId("transaction-item")).toBeNull();
  });

  it("shows error message when there is an error initially", () => {
    const mockError = new Error("Network Failed");
    const { getByText, queryByTestId } = render(
      <TransactionList
        transactions={[]}
        isLoading={false}
        error={mockError}
        onRefresh={mockOnRefresh}
      />
    );
    expect(
      getByText(strings.errorLoadTransactionsPrefix.replace(": ", ""))
    ).toBeTruthy(); // Match the adjusted string in component
    expect(getByText(mockError.message)).toBeTruthy();
    expect(queryByTestId("transaction-item")).toBeNull();
  });

  it('shows "No transactions found" when list is empty and not loading/error', () => {
    const { getByText, queryByTestId } = render(
      <TransactionList
        transactions={[]}
        isLoading={false}
        error={null}
        onRefresh={mockOnRefresh}
      />
    );
    expect(getByText(strings.noTransactions)).toBeTruthy();
    expect(queryByTestId("transaction-item")).toBeNull();
  });

  it("renders list of transactions when data is provided", () => {
    const { getAllByTestId, getByText } = render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        error={null}
        onRefresh={mockOnRefresh}
      />
    );

    expect(getByText(strings.transactionsTitle)).toBeTruthy(); // Title
    const items = getAllByTestId("transaction-item");
    expect(items).toHaveLength(mockTransactions.length);

    expect(within(items[0]).getByText(mockTransactions[0].id)).toBeTruthy();
    expect(within(items[1]).getByText(mockTransactions[1].id)).toBeTruthy();
  });

  it("calls onRefresh when FlatList refresh is triggered", () => {
    const { getByTestId } = render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        error={null}
        onRefresh={mockOnRefresh}
      />
    );
  });
});
