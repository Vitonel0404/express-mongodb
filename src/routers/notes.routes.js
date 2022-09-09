const express = require('express');

const noteRouters = express.Router();

const { 
    renderNoteForm,
    createNewNote,
    renderListNotes,
    renderEditForm,
    updateNote,
    deleteNote,
} = require('../controllers/notes.controller');

const { isAuthenticated } =require('../helpers/auth'); //para proteger las rutas si no está autenticado

//Listar notas
noteRouters.get('/',isAuthenticated,renderListNotes);
//obtener form notes
noteRouters.get('/add',isAuthenticated,renderNoteForm);
//add notes
noteRouters.post('/new-note',isAuthenticated,createNewNote);

//edit notes
noteRouters.get('/edit/:id',isAuthenticated,renderEditForm);

//update note
noteRouters.put('/edit/:id',isAuthenticated,updateNote);
//delete note
noteRouters.delete('/delete/:id',isAuthenticated,deleteNote);

module.exports.noteRouters=noteRouters