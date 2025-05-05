import AsyncStorage from "@react-native-async-storage/async-storage";
import { SAVE_BUDGET_FAILED } from "../constants/errors";

const BUDGET_KEY = "fintech_app_budget";

export const saveBudget = async (amount: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(BUDGET_KEY, amount.toString());
  } catch (error) {
    console.error("Error saving budget:", error);
    throw new Error(SAVE_BUDGET_FAILED);
  }
};

export const getBudget = async (): Promise<number | null> => {
  try {
    const budgetStr = await AsyncStorage.getItem(BUDGET_KEY);
    if (budgetStr !== null) {
      return parseFloat(budgetStr);
    }
    return null;
  } catch (error) {
    console.error("Error retrieving budget:", error);
    return null;
  }
};

export const budgetStatus = (
  expenses: number,
  budget: number | null
): "under" | "over" | "none" => {
  if (budget === null || budget <= 0) {
    return "none";
  }

  return expenses <= budget ? "under" : "over";
};
