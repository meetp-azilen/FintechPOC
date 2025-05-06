
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
} // This interface is also imported by ApiService.ts

