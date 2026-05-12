const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const socketHandler = require('./socket/index');
socketHandler(server);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/tokens', tokenRoutes);

app.get('/', (req, res) => {
  res.send('MediQueue API is running');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
