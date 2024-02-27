const express = require ('express');
const con = require ('./databases/config');
const router = require ('./Routers/router');
const app = new express ();
const PORT = process.env.PORT || 4000;
const cors = require ('cors');
// const connectDB = require('./database/config');

// connectDB()
// Order of middleware matters
app.use (
  cors ({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use (express.json ());
app.use (router);

app.listen (PORT, () => {
  console.log (`port start will be ${PORT}`);
});
