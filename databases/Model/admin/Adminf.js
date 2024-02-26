const mongoose = require ('mongoose');
const AdminSchema = mongoose.Schema (
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
    isAdmin: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      default: 'male',
    },
    image: {
      type: String,
      default: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg',
    },
  },
  {timestamp: true}
);
const Admin = mongoose.model('admin', AdminSchema);
module.exports=Admin;