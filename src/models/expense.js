class Expense {
    constructor() {
        this.expenses = [];
        this.idCounter = 1;
    }

    // Retorna todas as despesas
    getAll() {
        return this.expenses;
    }

    // Busca uma despesa pelo ID
    getById(id) {
        return this.expenses.find(item => item.id === id);
    }

    // Cria uma nova despesa
    create(dados) {
        const newExpense = {
            id: "exp_" + this.idCounter, // Formato pedido no enunciado
            title: dados.title,
            amount: Number(dados.amount),
            category: dados.category,
            date: dados.date,
            description: dados.description || "",
            createdAt: new Date().toISOString()
        };

        this.expenses.push(newExpense);
        this.idCounter++; // Incrementa o contador para o próximo
        return newExpense;
    }

    // Atualiza os dados de uma despesa
    update(id, dadosNovos) {
        const index = this.expenses.findIndex(item => item.id === id);

        if (index === -1) {
            return null;
        }

        // Atualiza os campos mantendo o que já existia (Spread operator)
        this.expenses[index] = {
            ...this.expenses[index],
            ...dadosNovos
        };

        return this.expenses[index];
    }

    // Remove uma despesa do vetor
    delete(id) {
        const index = this.expenses.findIndex(item => item.id === id);
        
        if (index === -1) {
            return false;
        }

        this.expenses.splice(index, 1);
        return true;
    }
}

// Exporta a instância da classe
module.exports = new Expense();