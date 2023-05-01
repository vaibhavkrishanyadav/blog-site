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
app.use(morgan('dev'));

// app.get('/add-blog', (req, res) => {
//   const blog = Blog({
//     title: 'my blog 2',
//     snippet: 'Lorem ipsum dolor sit amet consectetur',
//     body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quibusdam quaerat illo a modi tenetur ut blanditiis, illum quo consectetur recusandae excepturi natus impedit rem, tempora cum fuga quae in.',
//   });

//   blog.save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err))
// })

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  console.log('about');
  res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1})
    .then((result) => {
      res.render('index', { title: 'All-blogs', blogs: result})
    })
    .catch((err) => console.log(err))
})

app.get('/blogs/create', (req, res) => {
  console.log('blog');
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
