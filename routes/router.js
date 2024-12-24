const express = require('express');
const router = express.Router();
const pool = require('../db'); 

router.post('/enviar', async (req, res) => {
    const { titulo, descricao, prazo, importancia } = req.body;

    if (!titulo) {
        return res.status(400).send('O título é obrigatório.');
    }

    try {
        const query = `
            INSERT INTO TAREFAS (titulo, descricao, prazo, importancia)
            VALUES (?, ?, ?, ?)
        `;
        await pool.execute(query, [titulo, descricao || null, prazo || null, importancia || null]);
        res.redirect('/'); // Redirecione para a página principal
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).send('Erro ao criar a tarefa.');
    }
});

router.get('/tarefas', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM TAREFAS');
        res.json(rows); // Retorna as tarefas como JSON
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).send('Erro ao carregar as tarefas.');
    }
});

router.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM TAREFAS WHERE id_tarefa = ?';
        const [result] = await pool.execute(query, [id]);

        if (result.affectedRows > 0) {
            res.status(200).send('Tarefa excluída com sucesso.');
        } else {
            res.status(404).send('Tarefa não encontrada.');
        }
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        res.status(500).send('Erro ao excluir a tarefa.');
    }
});

router.put('/tarefas/:id/concluir', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'UPDATE TAREFAS SET status = ? WHERE id_tarefa = ?';
        const [result] = await pool.execute(query, ['concluida', id]);

        if (result.affectedRows > 0) {
            res.status(200).send('Tarefa concluída com sucesso.');
        } else {
            res.status(404).send('Tarefa não encontrada.');
        }
    } catch (error) {
        console.error('Erro ao atualizar o status da tarefa:', error);
        res.status(500).send('Erro ao atualizar a tarefa.');
    }
});

router.patch('/tarefa/desfazer/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = `UPDATE TAREFAS SET status = 'pendente' WHERE id_tarefa = ?`;
        await pool.execute(query, [id]);
        res.status(200).send('Tarefa marcada como pendente.');
    } catch (error) {
        console.error('Erro ao desfazer tarefa:', error);
        res.status(500).send('Erro ao desfazer a tarefa.');
    }
});



router.post('/editar', async (req, res) => {
    const { id_tarefa, titulo, descricao, prazo, importancia} = req.body;

    if (!id_tarefa || !titulo) {
        return res.status(400).send('ID da tarefa e título são obrigatórios.');
    }

    try {
        const query = `
            UPDATE TAREFAS 
            SET titulo = ?, descricao = ?, prazo = ?, importancia= ?
            WHERE id_tarefa = ?
        `;
        const [result] = await pool.execute(query, [
            titulo,
            descricao || null,
            prazo || null,
            importancia || null,
            id_tarefa,
        ]);

        if (result.affectedRows > 0) {
            res.redirect('/'); 
        } else {
            res.status(404).send('Tarefa não encontrada.');
        }
    } catch (error) {
        console.error('Erro ao editar tarefa:', error);
        res.status(500).send('Erro ao editar a tarefa.');
    }
});


module.exports = router;
