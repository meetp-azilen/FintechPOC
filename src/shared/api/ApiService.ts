import { Transaction } from "./models/Transaction";

export class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string = 'http://localhost:5000') { // Default to your Node.js server
        this.baseUrl = baseUrl;
    }

    async fetchTransactionsFromServer(): Promise<Transaction[]> {
        const endpoint = `${this.baseUrl}/api/transactions`;
        console.log(`Fetching transactions from: ${endpoint}`);

        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                let errorMessage = `API request failed with status ${response.status}`;
                try {
                    // Try to parse a JSON error response from the server
                    const errorData = await response.json();
                    errorMessage += `: ${errorData.message || response.statusText}`;
                } catch (e) {
                    // If parsing JSON fails, use the plain statusText
                    errorMessage += `: ${response.statusText}`;
                }
                console.error(errorMessage);
                throw new Error(errorMessage);
            }

            const data = await response.json();
            return data as Transaction[];
        } catch (error) {
            console.error("Error in ApiService.fetchTransactionsFromServer:", error);
            throw error;
        }
    }
}