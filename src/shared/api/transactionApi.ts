import { FETCH_TRANSACTIONS_FAILED } from "../constants/errors"; // Import error constants
//

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2025-04-01",
    amount: 2500,
    type: "income",
    category: "Salary",
    description: "Monthly salary deposit",
  },
  {
    id: "2",
    date: "2025-04-02",
    amount: 50,
    type: "expense",
    category: "Groceries",
    description: "Weekly groceries",
  },
  {
    id: "3",
    date: "2025-04-03",
    amount: 15,
    type: "expense",
    category: "Food & Drink",
    description: "Coffee shop",
  },
  {
    id: "4",
    date: "2025-04-05",
    amount: 120,
    type: "expense",
    category: "Utilities",
    description: "Electricity bill",
  },
  {
    id: "5",
    date: "2025-04-10",
    amount: 200,
    type: "expense",
    category: "Transport",
    description: "Fuel",
  },
  {
    id: "6",
    date: "2025-04-15",
    amount: 500,
    type: "income",
    category: "Refund",
    description: "Refund received for Macbook Purchase",
  },
  {
    id: "7",
    date: "2025-04-18",
    amount: 75,
    type: "expense",
    category: "Shopping",
    description: "New clothes",
  },
  {
    id: "8",
    date: "2025-04-20",
    amount: 40,
    type: "expense",
    category: "Entertainment",
    description: "Movie tickets",
  },
];

// Simulate API request delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API functions
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    // Simulate network delay
    await delay(1000);

    // Simulate random API failure (10% chance)
    if (Math.random() < 0.1) {
      throw new Error(FETCH_TRANSACTIONS_FAILED);
    }

    return mockTransactions;
  } catch (error) {
    throw error;
  }
};

export const getTotalExpense = (transactions: Transaction[]): number => {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const getTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
};
