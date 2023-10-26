const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Budget = require('./budgetSchema'); 

// GET /budget
router.get('/', async (req, res) => {
    try {
        const data = await Budget.find({});
        res.json({ myBudget: data });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /budget
router.post(
    '/',
    body('title').notEmpty(),
    body('budget').isInt(),
    body('color').matches(/^#[0-9A-Fa-f]{6}$/),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newBudgetData = req.body;
            const budgetItem = new Budget(newBudgetData);
            const savedBudgetItem = await budgetItem.save();
            res.json(savedBudgetItem);
        } catch (err) {
            console.error(err); // Log the error for debugging purposes
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

module.exports = router;