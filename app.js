const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Lorem ipsum', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Lorem ipsum', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Lorem ipsum', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  console.log('index');
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  console.log('about');
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  console.log('blog');
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
