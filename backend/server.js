require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path");
const helmet = require('helmet');

// Import routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const rajalRoutes = require('./routes/rajalRoutes');
const igdRoutes = require('./routes/igdRoutes');
const ranapRoutes = require('./routes/ranapRoutes');
const rmeRoutes = require('./routes/rmeRoutes');
const obatRoutes = require("./routes/obatRoutes");
const datamasterRoutes = require("./routes/datamasterRoutes");

const app = express();
const allowedOrigins = [process.env.FRONTEND_ORIGIN, "http://localhost:5173"];

// Middlewares
app.use(cors({
  origin: allowedOrigins,
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
app.use("/", datamasterRoutes);

// CSP configuration
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "https://trusted-cdn.com"],
//       styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//       imgSrc: ["'self'", "data:", "https://images.com"],
//       connectSrc: ["'self'", "http://localhost:5000"], // control which endpoints can be connected to via fetch, websocket, etc.
//       fontSrc: ["'self'", "https://fonts.gstatic.com"],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//   })
// );

// Frontend static files
const frontendPath = path.join(__dirname, "client", "dist"); // or "build"
app.use(express.static(frontendPath));

// Serve frontend for all unmatched GET routes
app.get((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});