import { render } from '@testing-library/react-native';
import React from 'react';
import { Transaction } from '../api/transactionApi';
import TransactionItem from '../components/TransactionItem';

describe('TransactionItem Component', () => {
  const expenseTransaction: Transaction = {
    id: "1",
    date: "2025-04-26T10:00:00.000Z",
    amount: 50.75,
    type: "expense",
    category: "Groceries",
    description: "Weekly shopping",
  };

  const incomeTransaction: Transaction = {
    id: "2",
    date: "2025-04-25T14:30:00.000Z",
    amount: 1200,
    type: "income",
    category: "Salary",
    description: "April paycheck",
  };

  it("renders expense transaction correctly", () => {
    const { getByText } = render(
      <TransactionItem transaction={expenseTransaction} />
    );

    expect(getByText("Groceries")).toBeTruthy();
    expect(getByText("Weekly shopping")).toBeTruthy();
    expect(
      getByText(new Date(expenseTransaction.date).toLocaleDateString())
    ).toBeTruthy();

    const amountText = getByText("-$50.75");
    expect(amountText).toBeTruthy();
  });

  it("renders income transaction correctly", () => {
    const { getByText } = render(
      <TransactionItem transaction={incomeTransaction} />
    );

    expect(getByText("Salary")).toBeTruthy();
    expect(getByText("April paycheck")).toBeTruthy();
    expect(
      getByText(new Date(incomeTransaction.date).toLocaleDateString())
    ).toBeTruthy();

    const amountText = getByText("+$1200.00");
    expect(amountText).toBeTruthy();
  });
});
