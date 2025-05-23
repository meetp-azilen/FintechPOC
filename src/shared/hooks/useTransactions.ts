import { useEffect, useState } from "react";
import {
  fetchTransactions,
  getTotalExpense,
  getTotalIncome,
} from "../../modules/dashboard/services/transactionService";
import { Transaction } from "../api/models/Transaction";
import { UNKNOWN_ERROR } from "../constants/errors";

interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  totalExpenses: number;
  totalIncome: number;
  refresh: () => void;
}

export const useTransactions = (): TransactionsState => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchTransactions();
      setTransactions(
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );

      setTotalExpenses(getTotalExpense(data));
      setTotalIncome(getTotalIncome(data));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(UNKNOWN_ERROR));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,
    isLoading,
    error,
    totalExpenses,
    totalIncome,
    refresh: loadTransactions,
  };
};
