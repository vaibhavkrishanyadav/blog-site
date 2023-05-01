const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const passKeys = require('./pass-keys');

// express app
const app = express();

mongoose.connect(passKeys.dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// middleware and static files
app.use(express.static('public'));
// used to transfer form data to req body
app.use(express.urlencoded());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  console.log('about');
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  console.log('blog');
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1})
    .then((result) => {
      res.render('index', { title: 'All-blogs', blogs: result})
    })
    .catch((err) => console.log(err))
})

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details'});
    })
    .catch(err => {
      console.log(err);
    })
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    })
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
