import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { budgetStatus } from "../../modules/dashboard/services/budgetService"; // Removed getBudget, saveBudget
import { LOAD_BUDGET_FAILED, SET_BUDGET_FAILED } from "../constants/errors";

interface BudgetState {
  budget: number | null;
  setBudgetAmount: (amount: number) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  getBudgetStatus: (expenses: number) => "under" | "over" | "none";
}

const BUDGET_STORAGE_KEY = "@userBudget"; // Define a key for AsyncStorage

export const useBudget = (): BudgetState => {
  const [budget, setBudget] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const storedBudget = await AsyncStorage.getItem(BUDGET_STORAGE_KEY);
        if (storedBudget !== null) {
          setBudget(parseFloat(storedBudget));
        } else {
          setBudget(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(LOAD_BUDGET_FAILED));
      } finally {
        setIsLoading(false);
      }
    };

    loadBudget();
  }, []);

  const setBudgetAmount = useCallback(async (amount: number) => {
    try {
      setError(null); // Clear previous errors
      if (amount !== null && amount > 0) {
        await AsyncStorage.setItem(BUDGET_STORAGE_KEY, amount.toString());
        setBudget(amount);
      } else {
        // If amount is invalid (e.g., 0 or negative), remove it or handle as needed
        await AsyncStorage.removeItem(BUDGET_STORAGE_KEY);
        setBudget(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(SET_BUDGET_FAILED));
      throw err;
    }
  }, []);

  const getBudgetStatus = useCallback(
    (expenses: number) => {
      return budgetStatus(expenses, budget);
    },
    [budget]
  );

  return {
    budget,
    setBudgetAmount,
    isLoading,
    error,
    getBudgetStatus,
  };
};
