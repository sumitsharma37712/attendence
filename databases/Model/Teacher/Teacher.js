const mongoose = require ('mongoose');

const TeacherSchema = mongoose.Schema (
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    contact: {
      type: Number,
      require: true,
      trim: true,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    }
  },
  {timestamp: true}
);

const Teacher = mongoose.model('Teacher',TeacherSchema)

module.exports=Teacher