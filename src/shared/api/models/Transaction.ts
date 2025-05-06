import { TransactionType } from "./TransactionType";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
} // This interface is also imported by ApiService.ts
