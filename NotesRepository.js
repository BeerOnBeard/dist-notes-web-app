const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

class NotesRepository {
  constructor(connectionString) {
    this.connectionString = connectionString;
  }

  async getNotesForUser(userId) {
    var db = await MongoClient.connect(this.connectionString);
    var items = await db.collection('notes')
      .find({userId: userId})
      .toArray();

    db.close();
    return items;
  }

  async addNoteForUser(userId, name, contents) {
    var db = await MongoClient.connect(this.connectionString);
    var result = await db.collection('notes').insert({
      userId: userId,
      name: name,
      contents: contents
    });

    db.close()
    return result;
  }

  async deleteNote(userId, noteId) {
    var db = await MongoClient.connect(this.connectionString);
    var result = await db.collection('notes').deleteOne({
      _id: ObjectId(noteId),
      userId: userId
    });

    db.close();
    return result;
  }
};

module.exports = NotesRepository;