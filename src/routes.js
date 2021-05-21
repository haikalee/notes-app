const { addNoteHandler, getAllNotesHandler, getNote, editNoteByIdHandler, deleteNote } = require("./handler");

const routes = [
  {
    path: '/notes',
    method: 'POST',
    handler: addNoteHandler
  },
  {
    path: '/notes',
    method: 'GET',
    handler: getAllNotesHandler
  },
  {
    path: '/notes/{id}',
    method: 'GET',
    handler: getNote
  },
  {
    path: '/notes/{id}',
    method: 'PUT',
    handler: editNoteByIdHandler
  },
  {
    path: '/notes/{id}',
    method: 'DELETE',
    handler: deleteNote
  }
];

module.exports = routes;