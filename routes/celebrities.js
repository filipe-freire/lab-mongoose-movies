const express = require('express');
const router = express.Router();

const Celebrity = require('./../models/celebrity');

router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/create');
});

router.post('/celebrities', (req, res, next) => {
  const data = req.body;

  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(celebrity => {
      console.log('Following celebrity created:', celebrity);
      celebrity.save();
      res.redirect('celebrities');
    })
    .catch(error => {
      res.render('celebrities/create');
      next(error);
    });
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/index', { celebrities });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrity => {
      res.render('celebrities/show', celebrity);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  const id = req.params.id;
  console.log(req.params.id);
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('../../celebrities');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
