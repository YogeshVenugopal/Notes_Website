import express from 'express';
import AuthenticationToken from '../utilities.js';
import { addNote, deleteNote, editNote, getNotes, searchNotes, updatePinned } from '../Controllers/Notes.controller.js';

const router = express.Router();

router.post('/add-note', AuthenticationToken, addNote);
router.put('/edit-note/:id', AuthenticationToken, editNote);
router.get('/get-notes', AuthenticationToken,getNotes);
router.delete('/delete-note/:id', AuthenticationToken, deleteNote);
router.put('/update-pinned/:id', AuthenticationToken, updatePinned);
router.get('/search-notes', AuthenticationToken, searchNotes);
export default router;