const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {title: 'Expressando', message: 'Wellcome!'});
});

exports.homeRouter = router;
