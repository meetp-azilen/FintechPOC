import { useCallback, useEffect, useState } from "react";
import { budgetStatus, getBudget, saveBudget } from "../utils/budgetService";

interface BudgetState {
  budget: number | null;
  setBudgetAmount: (amount: number) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  getBudgetStatus: (expenses: number) => "under" | "over" | "none";
}

export const useBudget = (): BudgetState => {
  const [budget, setBudget] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        setIsLoading(true);
        const savedBudget = await getBudget();
        setBudget(savedBudget);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load budget")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadBudget();
  }, []);

  const setBudgetAmount = useCallback(async (amount: number) => {
    try {
      await saveBudget(amount);
      setBudget(amount);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to set budget"));
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
