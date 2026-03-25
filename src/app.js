const express = require('express');
const Expense = require('./models/expense');

const app = express();
app.use(express.json()); // Middleware para entender JSON no body

// Rota para cadastrar (POST)
app.post('/expenses', (req, res) => {
    const { title, amount, date } = req.body;

    // Validações básicas
    if (!title) {
        return res.status(400).json({ error: "title é obrigatório" });
    }
    if (amount <= 0) {
        return res.status(400).json({ error: "amount deve ser maior que zero" });
    }
    
    // Valida se a data é no futuro
    if (new Date(date) > new Date()) {
        return res.status(400).json({ error: "A data não pode ser futura" });
    }

    const created = Expense.create(req.body);
    res.status(201).json(created);
});

// Rota para listar todas (GET)
app.get('/expenses', (req, res) => {
    let list = Expense.getAll();
    
    // Filtro por categoria
    const { category } = req.query;
    if (category) {
        list = list.filter(e => e.category === category);
    }
    
    res.status(200).json(list);
});

// Rota para buscar por ID (GET)
app.get('/expenses/:id', (req, res) => {
    const expense = Expense.getById(req.params.id);
    if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
});

// Rota para atualizar (PUT)
app.put('/expenses/:id', (req, res) => {
    const updated = Expense.update(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(updated);
});

// Rota para deletar (DELETE)
app.delete('/expenses/:id', (req, res) => {
    const success = Expense.delete(req.params.id);
    if (!success) {
        return res.status(404).json({ error: "Expense not found" });
    }
    res.status(204).send();
});

// Rota extra: Total de despesas
app.get('/expenses/summary/total', (req, res) => {
    const despesas = Expense.getAll();
    let totalGeral = 0;
    
    // Usando o loop 'for of' que o professor usou no tarefas.js
    for (let d of despesas) {
        totalGeral += d.amount;
    }
    
    res.status(200).json({ total: totalGeral });
});

// Rodando o servidor
app.listen(1080, () => {
    console.log("Servidor rodando na porta 1080");
});