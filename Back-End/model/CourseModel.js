
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    image: {
      type: String, 
      
    }
  });

  const courseSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true, 
    },
    labels: [String], 
    paragraphDescription: String, 
    lessons: [lessonSchema]
  });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;