const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run('CREATE TABLE Post (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)');
});

// GET /posts - Retrieve all blog posts
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM Post', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET /posts/:id - Retrieve a single post by ID
app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Post WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(row);
  });
});

// POST /posts - Create a new post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }
  const stmt = db.prepare('INSERT INTO Post (title, content) VALUES (?, ?)');
  stmt.run([title, content], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
  stmt.finalize();
});

// DELETE /posts/:id - Delete a post by ID
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Post WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json({ message: 'Post deleted' });
  });
});

app.put('/api/posts/:id', (req, res) => { 
    const { id } = req.params;
    const { title, content } = req.body;

    db.run(
      'UPDATE Post SET title = ?, content = ? WHERE id = ?',
      [title, content, id],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
  
      
        if (this.changes === 0) {
          res.status(404).json({ error: 'Post not found' });
          return;
        }
  
    
        res.json({ message: 'Post updated successfully' });
      }
    );
  });
  
// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
