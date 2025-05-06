import { FETCH_TRANSACTIONS_FAILED } from "../constants/errors"; // Import error constants
//
import { ApiService } from "../api/ApiService"; // Import the new ApiService
import { Transaction } from "./models/Transaction"; // Import TransactionType enum
import { TransactionType } from "./models/TransactionType";

// Create an instance of our ApiService
const apiService = new ApiService();

// API functions
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const transactions = await apiService.fetchTransactionsFromServer();
    // console.log("Fetched transactions:", transactions);
    return transactions;
  } catch (error) {
    console.error("fetchTransactions failed:", error);
    // Throw a new error with a more descriptive message
    let errorMessage = FETCH_TRANSACTIONS_FAILED;
    if (error instanceof Error && error.message) {
      errorMessage += `: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
};

export const getTotalExpense = (transactions: Transaction[]): number => {
  return transactions
    .filter((transaction) => transaction.type === TransactionType.Expense)
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const getTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((transaction) => transaction.type === TransactionType.Income)
    .reduce((total, transaction) => total + transaction.amount, 0);
};
