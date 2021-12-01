const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongo-exercise");

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "React Native",
    author: "Miranda",
    tags: ["React", "Front End"],
    isPublished: false,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
    const courses = await Course.find({ isPublished: true, tags: 'backend' })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 }); // or astring: 'name, author'
 
    const courses2 = await Course.find({ isPublished: true, tags: /end/i })
      .sort({ price: -1 })
      .select({ name: 1, author: 1 }); // or astring: 'name, author'
    
    const courses3 = await Course.find({ isPublished: true})
        .or([{ price: { $gte: 15 }}, { name: /.*by.*/i }])
  console.log(courses);
}

