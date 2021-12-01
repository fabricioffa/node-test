const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [5, 'A course name should have at least 5 letters'],
    maxlength: 255,
    //  match: /patern/,
    lowercase: true,
    // uppercase: false,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["backend", "frontend", "fullstack"],
  },
  author: String,
  // Is tags would be required, asimple empty array would pass the test. So a costum:
  tags: {
    type: Array,
    validate: {
      // Can be async
      validator: function (v) {
          return v && v.length > 0;
      },
      message: props => `A course shoudl have at leat one tag, but you sent ${props.value}` ,
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 100,
    get: v => Math.round(v),
    set: v => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Só",
    category: "back",
    author: "Cicerus",
    tags: null,
    isPublished: true,
    // price: 26
  });

  try {
    // await course.validate() // One could optionaly validate before, but it has the flaw of return void **cb to attach some logic**
    const result = await course.save();
    console.log(result);
  } catch (e) {
      for (field in e.errors)
      console.log('\n', e.errors[field].properties);
    }
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({
    author: "Cicerus",
    tag: ["intermediary"],
  })
    // To get to a given page:
    //  .skip((pageNumber -1) * pagezise)
    //  .imit(pageSize)
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tag: 1 }); // could .count() intead

  console.log(courses);
}

async function updateCourse(id) {
  //  Query first approuch

  // const course = await Course.findById(id);
  // if (!course) return;

  // course.name = 'Anothe Name'; // Could've used course.set()
  // course.author = 'Fulano';

  // const result = await course.save();
  // console.log(result);

  //  Update first

  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        name: "Literature 2",
        author: "Ovidius",
      },
    }
  );

  console.log(result);
}

async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

createCourse();
