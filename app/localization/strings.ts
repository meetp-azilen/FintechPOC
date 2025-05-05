// Define a structure for the strings, starting with English (en)
const strings = {
  en: {
    // HomeScreen
    homeScreenTitle: "Track your Finance",
    transactionsTitle: "Recent Transactions",
    loadingTransactions: "Loading transactions...",
    errorLoadTransactionsPrefix: "Failed to load transactions: ",
    noTransactions: "No transactions found",

    // BudgetInput
    budgetInputSetTitle: "Set Monthly Budget",
    budgetInputViewTitle: "Monthly Budget",
    budgetInputDollarSign: "$",
    budgetInputPlaceholder: "Enter budget amount",
    budgetInputSaveButton: "Save Budget",
    budgetInputErrorEmpty: "Please enter a budget amount",
    budgetInputErrorInvalid: "Please enter a valid budget amount",
    budgetInputErrorSave: "Failed to save budget",

    // BudgetVisualization
    budgetVisTitle: "Budget Status",
    budgetVisPromptSetBudget: "Set a monthly budget to track your spending",
    budgetVisStatusUnder: "Under Budget",
    budgetVisStatusOver: "Over Budget",
    budgetVisRemainingSuffix: " remaining",
    budgetVisOverBudgetSuffix: " over budget",
    budgetVisPercentageSymbol: "%",
    budgetVisSpentLabel: "Spent",

    // Component Names (for testing/debugging)
    testBudgetInputComponentName: "BudgetInput",
    testBudgetVisualizationComponentName: "BudgetVisualization",
    testTransactionListComponentName: "TransactionList",

  },
  // Add other languages here later, e.g., es: { ... }
};

// For now, we'll just export the English strings directly.
// Later, you could add logic here to select the language based on device settings.
export default strings.en;