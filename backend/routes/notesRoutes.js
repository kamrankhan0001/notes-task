import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/notesController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // all routes are protected
// Apply authMiddleware to all routes in this router
// router.get('/', authMiddleware, getNotes);

router.get('/', getNotes);

router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
