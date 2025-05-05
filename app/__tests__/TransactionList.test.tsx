import { render, within } from '@testing-library/react-native'; // Import 'within'
import React from 'react';
import { Transaction } from '../api/transactionApi'; // Adjust path
import TransactionList from '../components/TransactionList';

const mockOnRefresh = jest.fn();

const mockTransactions: Transaction[] = [
  { id: '1', date: '2025-04-26T10:00:00Z', amount: 50, type: 'expense', category: 'Food', description: 'Lunch' },
  { id: '2', date: '2025-04-25T14:00:00Z', amount: 1000, type: 'income', category: 'Salary', description: 'Paycheck' },
];

jest.mock('../components/TransactionItem', () => {
  const { View, Text } = require('react-native');
  return (props: { transaction: Transaction }) => (
    <View testID="transaction-item"><Text>{props.transaction.id}</Text></View>
  );
});

describe('TransactionList Component', () => {
  beforeEach(() => {
    mockOnRefresh.mockClear();
  });

  it('shows loading indicator when loading initially', () => {
    const { getByText, queryByTestId } = render(
      <TransactionList
        transactions={[]}
        isLoading={true}
        error={null}
        onRefresh={mockOnRefresh}
      />
    );
    expect(getByText('Loading transactions...')).toBeTruthy();
    expect(queryByTestId('transaction-item')).toBeNull();
  });

  it('shows error message when there is an error initially', () => {
    const mockError = new Error('Network Failed');
    const { getByText, queryByTestId } = render(
      <TransactionList
        transactions={[]}
        isLoading={false}
        error={mockError}
        onRefresh={mockOnRefresh}
      />
    );
    expect(getByText('Failed to load transactions')).toBeTruthy();
    expect(getByText(mockError.message)).toBeTruthy();
    expect(queryByTestId('transaction-item')).toBeNull();
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
    expect(getByText('No transactions found')).toBeTruthy();
    expect(queryByTestId('transaction-item')).toBeNull();
  });

  it('renders list of transactions when data is provided', () => {
    const { getAllByTestId, getByText } = render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        error={null}
        onRefresh={mockOnRefresh}
      />
    );

    expect(getByText('Recent Transactions')).toBeTruthy(); // Title
    const items = getAllByTestId('transaction-item');
    expect(items).toHaveLength(mockTransactions.length);

    expect(within(items[0]).getByText(mockTransactions[0].id)).toBeTruthy();
    expect(within(items[1]).getByText(mockTransactions[1].id)).toBeTruthy();
  });

  it('calls onRefresh when FlatList refresh is triggered', () => {
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
