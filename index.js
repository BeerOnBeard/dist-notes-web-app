const config = require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const NotesRepository = require('./NotesRepository');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/users/:userId/notes', async(req, res) => {
  var userId = req.params.userId;

  var repo = new NotesRepository(config.mongodb);
  var notes = await repo.getNotesForUser(userId);
  res.json(notes);
});

app.post('/users/:userId/notes', async(req, res) => {
  var userId = req.params.userId;
  var note = req.body;

  var repo = new NotesRepository(config.mongodb);
  var result = await repo.addNoteForUser(userId, note.name, note.contents);
  res.sendStatus(201);
});

app.delete('/users/:userId/notes/:noteId', async(req, res) => {
  var userId = req.params.userId;
  var noteId = req.params.noteId;

  var repo = new NotesRepository(config.mongodb);
  var result = await repo.deleteNote(userId, noteId);

  if (result.deletedCount === 1) {
    res.sendStatus(200);
    return;
  }

  res.sendStatus(404);
});

app.listen(3000, () => console.log('Listening on port 3000.'));