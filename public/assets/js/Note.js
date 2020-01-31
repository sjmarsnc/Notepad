class Note {
    constructor (title, text) {
        if (title !== null && title !== '') this.title = title;
        if (text !== null && text !== undefined) this.text = text;
         
        // makes a unique id 
        this.ID = ++Note.counter; 
        
    }
    
    
    getTitle() {
        return this.title;
    }
    
    getId() {
        return this.ID;
    }
    
    getContent() {
        return this.content; 
    }
    
    setContent (newContent) {
        this.content = newContent;  
    }
}

Note.counter = 0;   // will increment this for each customer 
 
module.exports = Note;
