const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

class NotesRepository {
  constructor(connectionString) {
    this.connectionString = connectionString;
  }

  getNotesForUser(userId) {
    return MongoClient.connect(this.connectionString)
      .then(function(db){
        return db.collection('notes').find({userId: userId}).toArray()
          .then(function(items){
            db.close();
            return items;
          });
      });
  }

  addNoteForUser(userId, name, contents) {
    return MongoClient.connect(this.connectionString)
      .then(function(db){
        return db.collection('notes').insert({
          userId: userId,
          name: name,
          contents: contents
        }).then(function(result){
          db.close();
          return result;
        });
      });
  }

  deleteNote(userId, noteId) {
    return MongoClient.connect(this.connectionString)
      .then(function(db){
        return db.collection('notes').deleteOne({
          _id: ObjectId(noteId),
          userId: userId
        }).then(function(result){
          db.close();
          return result;
        });
      });
  }
};

module.exports = NotesRepository;