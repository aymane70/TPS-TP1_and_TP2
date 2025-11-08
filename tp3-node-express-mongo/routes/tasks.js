import express from 'express';
import Task from '../models/Task.js';
const router = express.Router();
// Liste des tâches
router.get('/', async (req, res) => {
const tasks = await Task.find().sort({ createdAt: -1 });
res.json(tasks);
});
// Création
router.post('/', async (req, res) => {
const { text } = req.body;
if (!text || !text.trim()) return res.status(400).json({ error: 'Le champ text est requis.' });
    
const task = await Task.create({ text: text.trim() });
res.status(201).json(task);
});
// Mise à jour
router.put('/:id', async (req, res) => {
const { id } = req.params;
const { text, done } = req.body;
const update = {};
if (typeof text === 'string') update.text = text.trim();
if (typeof done === 'boolean') update.done = done;
const task = await Task.findByIdAndUpdate(id, update, { new: true });
res.json(task);
});
// Suppression
router.delete('/:id', async (req, res) => {
const { id } = req.params;
await Task.findByIdAndDelete(id);
res.json({ message: 'Tâche supprimée' });
});
export default router;
