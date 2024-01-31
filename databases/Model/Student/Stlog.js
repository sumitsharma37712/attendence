const mongoose = require('mongoose')
const StudentSchema = mongoose.Schema(
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
      isStudent: {
        type: Boolean,
        default: false,
      },
      subject: {
        type: String,
        default: '',
      },
      appartment: {
        type: String,
        default: '',
      },
      zip: {
        type: String,
        default: '',
      },
      country: {
        type: String,
        default: '',
      },      
    },
    {timestamp: true}
  );
  
const Student = mongoose.model ('Student', StudentSchema);

module.exports = Student;
