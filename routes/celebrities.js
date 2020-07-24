const express = require('express');
const router = express.Router();

const Celebrity = require('./../models/celebrity');

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
  Celebrity.findOne(id)
    .then(celebrities => {
      res.render('celebrities/show', { celebrities });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
