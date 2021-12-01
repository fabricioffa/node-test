const router = require('express').Router();
const Joi = require('joi');

const { putVerifier } = require('../verifiers');

let courses = [
  {id: 1, name: 'Grammar: Begginer', price: '$50,00'},
  {id: 2, name: 'Grammar: Intermediary', price: '$50,00'},
  {id: 3, name: 'Grammar: Advancced', price: '$50,00'},
  {id: 4, name: 'Poetry: Begginer', price: '$50,00'},
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req,res) => {
  const course = courses.find((course) => course.id === Number(req.params.id));
  if(!course) return res.status(404).send('Course not found');
  res.send(course);
});

router.post('/', (req, res) => {
  const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      price: Joi.string().min(5).max(20).required(),
  });

  const {result: error} = schema.validate(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  const course = {
      id: courses.length + 1,
      name: req.body.name,
      price: req.body.price,
  };

  courses.push(course);

  res.send(course)
});

router.put('/:id', (req,res) => {
  const course = courses.find((course) => course.id === Number(req.params.id));
  if(!course) return res.status(404).send('Course not found');

  const {error} = putVerifier(req.body);

  if(error) {
      return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name ? req.body.name : course.name
  course.price = req.body.price ? req.body.price : course.price

  res.send(course);

});

router.delete('/:id', (req,res) => {
  const course = courses.find((course) => course.id === Number(req.params.id));
  if(!course) return res.status(404).send('Course not found');

  courses = courses.filter(c => c.id !== Number(req.params.id))

  res.send(course)
});

exports.courseRouter = router;
