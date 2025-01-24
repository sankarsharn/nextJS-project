import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// In-memory storage for transactions (use a database in production)
let transactions = [];

// Endpoint to submit a transaction
app.post("/api/transactions", (req, res) => {
    const { expense, description, date } = req.body;
    if (!expense || !description || !date) {
        return res.status(400).json({ error: "All fields are required." });
    }
    const newTransaction = { id: Date.now(), expense, description, date };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

// Endpoint to fetch all transactions
app.get("/api/transactions", (req, res) => {
    res.json(transactions);
});

// Endpoint to delete a transaction by ID
app.delete("/api/transactions/:id", (req, res) => {
    const { id } = req.params;
    const transactionId = parseInt(id, 10);

    // Find the transaction by ID
    const transactionIndex = transactions.findIndex((t) => t.id === transactionId);

    if (transactionIndex === -1) {
        return res.status(404).json({ error: "Transaction not found." });
    }

    // Remove the transaction from the array
    transactions.splice(transactionIndex, 1);

    res.status(200).json({ message: "Transaction deleted successfully." });
});

// Start the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
