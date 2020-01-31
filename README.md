# Note Taker 

## Description 

This application lets you write, save, and delete notes.  It uses an express backend and is currently storing the note data in a JSON file.  

## Business Context 

It's handy to keep track of a lot of information by creating persistent notes that are available on your computer.  

## User Story 

AS A user, I want to be able to manage notes to keep track of what I need to do.   

* write and save notes 
* see the list of existing saved notes 
* select a note by its title and display the contents
* delete notes when I am finished iwth them 

## Implmentation and routes 

The application is based on express and deployed on Heroku at 
[https://aqueous-garden-46288.herokuapp.com/](https://aqueous-garden-46288.herokuapp.com/).

The following API routes are available: 

* GET `/api/notes` - returns the entire saved notes file as JSON 
* POST `/api/notes` - receives a new note in the request body and saves that note in the JSON file, returns the new note to the client 
* DELETE `/api/notes/:id` - receives a query parameter containing the id of a note to delete 

