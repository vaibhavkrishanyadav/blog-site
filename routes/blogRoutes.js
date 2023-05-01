const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();


router.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1})
    .then((result) => {
      res.render('blogs/index', { title: 'All-blogs', blogs: result})
    })
    .catch((err) => console.log(err))
});

router.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/create', (req, res) => {
  console.log('blog');
  res.render('blogs/create', { title: 'Create a new blog' });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then(result => {
      res.render('blogs/details', { blog: result, title: 'Blog Details'});
    })
    .catch(err => {
      res.status(404).render('404', { title: 'Blog not found' });
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    })
});

module.exports = router;