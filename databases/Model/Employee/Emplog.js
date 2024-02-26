const mongoose = require ('mongoose');
const EmployeeSchema = mongoose.Schema (
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
    username: {
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
    isEmployee: {
      type: Boolean,
      default: true,
    },
    joindate: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg',
    },
    designation: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  {timestamp: true}
);

const Employee = mongoose.model ('Employee', EmployeeSchema);

module.exports = Employee;
