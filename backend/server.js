require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const rajalRoutes = require('./routes/rajalRoutes');
const igdRoutes = require('./routes/igdRoutes');
const ranapRoutes = require('./routes/ranapRoutes');
const rmeRoutes = require('./routes/rmeRoutes');
const obatRoutes = require("./routes/obatRoutes");

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// Middlewares
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/', authRoutes);
app.use('/', patientRoutes);
app.use('/', rajalRoutes);
app.use('/', igdRoutes);
app.use('/', ranapRoutes);
app.use('/', rmeRoutes);
app.use("/", obatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});