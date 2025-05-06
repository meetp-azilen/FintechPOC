const express = require('express');
const app = express();
const port = 5000; 

const mockTransactions = [
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

app.get('/api/transactions', (req, res) => {
    res.json(mockTransactions);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Transaction API server listening at http://0.0.0.0:${port}`);
});