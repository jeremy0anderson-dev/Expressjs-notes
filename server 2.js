const   express = require('express'),
        app = express(),
        fs = require('fs'),
        path = require('path'),
        [notes] = require(path.join(__dirname,'/db', '/notes.json')),
        PORT = process.env.PORT || 5000;
/////////////[ Middleware ]/////////////////
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'public'));
/////////////////////////////////////////////


///////////////[ Functions ] ////////////////
function filterId (id, notesArray){
    return notesArray.filter(note => note.id === id)[0];
}
function createNote(body, notesArray){
    const newNote = body;
    newNote.id = (notesArray.length+1).toString();
    notesArray.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify({notes: notesArray}, null, 2));
    console.log(notesArray);
    return newNote;
}
function deleteNote(id, notesArray){
    const dID = id;

    notesArray.splice(notesArray[Number(id)-1], 1);
    console.log(notesArray);
}
/////////////////////////////////////////////



///////////////[ Routes ] ///////////////////
app.route('/api/notes')
    .get((req, res) =>{
        res.send(notes);
    })
///////routes///////////
app.get('/', (req, res) =>{
    res.render('index.html');
});
app.get('/notes', (req, res) =>{
    res.render(path.join(__dirname, 'public', 'notes.html'));
});
app.route('/api/notes/:id')
    .get((req, res) =>{
        res.json(filterId(req.params.id, notes));
    })
    .delete((req, res) =>{
        res.send(filterId(req.id, notes));

    });
app.route('/api/notes')
    .get((req, res) =>{
        res.send(notes);
    })
    .post((req, res) =>{
        const newNote = createNote(req.body, notes);
        res.json(newNote);
    })
/////listener//////////
app.listen(PORT, () =>{
    console.log("listening on "+ PORT);
    console.log(notes);
})
