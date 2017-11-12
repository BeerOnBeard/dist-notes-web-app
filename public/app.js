(function(){
  function getNotes(userId, callback) {
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:3000/users/' + userId + '/notes';
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }

  function addNote(userId, name, contents, callback) {
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:3000/users/' + userId + '/notes';
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
        callback();
      }
    };
    xhr.send(JSON.stringify({
      name: name,
      contents: contents
    }));
  }

  function deleteNote(userId, noteId, callback) {
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:3000/users/' + userId + '/notes/' + noteId;
    xhr.open('DELETE', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        callback();
      }
    };
    xhr.send();
  }

  function NotesViewModel() {
    var self = this;
    self.userId = ko.observable();
    self.newNoteName = ko.observable();
    self.newNoteContents = ko.observable();
    self.errorText = ko.observable();
    self.notes = ko.observableArray();

    self.getNotes = function() {
      if (self.userId() === undefined) {
        self.errorText("What's your user identifier?");
        return;
      }

      getNotes(self.userId(), function(notes) {
        self.notes(notes);
      });

      self.errorText(undefined);
    };

    self.addNote = function() {
      if (self.userId() === undefined) {
        self.errorText("What's your user identifier?");
        return;
      }

      if (self.newNoteName() === undefined || self.newNoteContents() === undefined) {
        self.errorText("A note needs a name and something in it");
        return;
      }

      addNote(self.userId(), self.newNoteName(), self.newNoteContents(), function() {
        self.getNotes();
      });

      self.errorText(undefined);
      self.newNoteName(undefined);
      self.newNoteContents(undefined);
    };

    self.deleteNote = function(note) {
      if (self.userId() === undefined) {
        self.errorText("What's your user identifier?");
        return;
      }

      deleteNote(self.userId(), note._id, function() {
        self.getNotes();
      });

      self.errorText(undefined);
    }
  }

  window.addEventListener('DOMContentLoaded', function(){
    ko.applyBindings(new NotesViewModel());
  });
}());