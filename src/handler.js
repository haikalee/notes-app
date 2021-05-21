const notes = require('./notes');
const { nanoid } = require('nanoid');

const addNoteHandler = (request, h) => {
  const { title, body, tags } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const note = { id, title, body, tags, createdAt, updatedAt };

  notes.push(note);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan!!',
      data: { id }
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan!!',
  });

  response.code(500);
  return response;
}

const getAllNotesHandler = () => ({
  status: 'success',
  data: { notes }
})

const getNote = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((item) => item.id === id)[0];

  if (note != undefined) {
    return {
      status: 'success',
      data: { note }
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan!'
  });
  response.code(400);
  return response;
}

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

const deleteNote = (request, h) => {
  const { id } = request.params;

  const note = notes.findIndex((note) => note.id === id);

  if (note !== -1) {
    notes.splice(note, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

const handler = { addNoteHandler, getAllNotesHandler, getNote, editNoteByIdHandler, deleteNote };

module.exports = handler;