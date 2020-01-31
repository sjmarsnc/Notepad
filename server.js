// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var http = require("http");
var fs = require("fs");
var util = require("util");



const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// default structure of the database if does not exist 
// counter is incremented with each new note to create a unique id 
// each object in the array looks like: 
//    { title: "title of note", 
//      text: "text of note",
//      id:  idnumber 
//    }
var notesDB = {
  counter: 0,
  notes: []
};


// read in saved notes, if any 
readFileAsync(__dirname + "/db/db.json", "utf8")
.then(function (dbJSON) {
  notesDB = JSON.parse(dbJSON);
})
.catch( err => console.log(err));

var noteID = notesDB.counter;



// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3030;
// tells express to find any static files  
app.use(express.static('public')); 

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"), err=> console.log(err));
});

app.get("/assets/js/:file", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/js/", req.params.file), err => console.log(err));
});

app.get("/assets/css/:file", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/css/", req.params.file), err => console.log(err));
});


// Return all saved notes 
app.get("/api/notes", function (req, res) {
  return res.json(notesDB.notes);
});

// 
app.get("/api/notes/:id", function (req, res) {
  console.log("get Route: /api/notes/:id", req); 
  var chosen = req.params.id;

  for (let i = 0; i < notesDB.length; i++) {
    if (chosen === notesDB[i].noteID) {
      notesDB.notes.splice(i,1);         
      return res.json( { msg: "note deleted" } );
    }
  }

  return res.json( { msg: "note not found"});
});

app.delete("/api/notes/:id", function (req, res) {

  var chosen = parseInt( req.params.id );
 console.log ("delete Route /api/notes/:id   id=", chosen);  

  for (let i = 0; i < notesDB.notes.length; i++) {
    
    if (chosen === notesDB.notes[i].id) {
      notesDB.notes.splice(i,1);  
      writeFileAsync(__dirname + "/db/db.json", JSON.stringify(notesDB), "utf8")
        .then(function () {
          return res.json({ msg: "Note successfully deleted!" });
         })
        .catch( err => console.log(err));       
    }
  }

});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Create New note - takes in JSON input
app.post("/api/notes", function (req, res) {
  
  notesDB.counter ++; 

  notesDB.counter ++;  

  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: notesDB.counter
  };

  notesDB.notes.push(newNote);

  writeFileAsync(__dirname + "/db/db.json", JSON.stringify(notesDB), "utf8")
    .then(function () {
      res.status(200).json({ msg: "Note successfully added!" });
    });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
