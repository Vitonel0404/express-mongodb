const Note = require('../models/Note');

const renderNoteForm=(req,res)=>{
    return res.render('notes/new_note');
};

const createNewNote=async(req,res)=>{
    const { title, description } = req.body;

    //const {id} = req.user //obtener el ID de usuario
    //validar los datos con schema de notes
    const newNote = new Note({title, description});
    newNote.user=req.user.id
    await newNote.save()
    req.flash('success_msg','Note added successfully'); //ya se configuro el middleware en server.js para enviar el mensaje
    //return res.send('Create new note');
    return res.redirect('/notes');
};

const renderListNotes=async(req,res)=>{
    const notes = await Note.find({user:req.user.id}).sort({createdAt:'desc'});
    return res.render('notes/all_notes',{notes});
};

const renderEditForm=async(req,res)=>{
    const note = await Note.findById(req.params.id);

    if (note.user!=req.user.id) {
        return res.redirect('/notes');
    }
    return res.render('notes/edit_note',{note});
};

const updateNote=async(req,res)=>{
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg','Note updated successfully'); 
    return res.redirect('/notes');
};
const deleteNote=async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note deleted successfully');
    return res.redirect('/notes');
};

module.exports={
    renderNoteForm:renderNoteForm,
    createNewNote:createNewNote,
    renderListNotes:renderListNotes,
    renderEditForm:renderEditForm,
    updateNote:updateNote,
    deleteNote:deleteNote
};