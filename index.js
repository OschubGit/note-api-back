const express = require('express')
const app = express();
const logger = require('./loggerMiddlewear')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(logger)


let notes = [
    {
    "id": 1,
    "content": "frodo",
    "important": "frodo@example.com",
    "date": "2019-05-30T19:20:14.298Z",
    "state": true,
    },
    {
    "id": 2,
    "content": "Merry",
    "important": "merry@example.com",
    "date": "2019-05-30T19:20:14.298Z",
    "state": true,
    },
    {
    "id": 3,
    "content": "Sam",
    "important": "sam@example.com",
    "date": "2019-05-30T19:20:14.298Z",
    "state": true,
    },
]

app.get('/', (request, response) => {
    response.send('<h1>Hello word</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if(note){
        response.json(note)
    }else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  
  if(!note.content){
      response.status(400).json({
          error: 'note is missing'
      })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  
  const newNote = {
      id: maxId + 1,
      content: note.content,
      important: typeof note.important !== 'undefined' ? note.important : false,
      date: new Date().toISOString()
    }
    
    //notes = [...notes, newNote]
    notes = notes.concat(newNote)

    response.status(201).json(newNote)
})

app.use(( request, response) => {
    response.status(404).json({
        error: 'not found'
    })
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})