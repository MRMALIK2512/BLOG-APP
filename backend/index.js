const express = require('express');
const app = express();
app.use(express.json());

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

const cors = require('cors');
app.use(cors());

const Database = require('better-sqlite3');
const db = new Database('./database.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS Post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )
`);


// GET /api/posts
app.get('/api/posts', (req, res) => {
  console
  const posts = db.prepare('SELECT * FROM Post').all();
  res.json(posts);
});

// POST /api/posts
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const insert = db.prepare('INSERT INTO Post (title, content) VALUES (?, ?)');
  insert.run(title, content);
  res.status(201).json({ message: 'Post created' });
});

// PUT /api/posts/:id
app.put('/api/posts/:id', (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const update = db.prepare('UPDATE Post SET title = ?, content = ? WHERE id = ?');
  const result = update.run(title, content, id);
  if (result.changes === 0) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    res.json({ message: 'Post updated' });
  }
});

// PUT /api/posts/:id
app.get('/api/posts/:id', (req, res) => {
try{
  const { id } = req.params;
  const result = db.prepare('SELECT * FROM Post where id =  ?').get(id);
  if(result){
    return res.json(result);
  }
  else{
    return res.status(404).json({ message: 'Post not found' });
  }
}
catch{
 res.status(500).json({message : "internal sever error"})
}
});


// DELETE /api/posts/:id
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const remove = db.prepare('DELETE FROM Post WHERE id = ?');
  const result = remove.run(id);
  if (result.changes === 0) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    res.json({ message: 'Post deleted' });
  }
});
