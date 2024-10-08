const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const path = require('path'); 
const authRoutes = require('./routes/user'); 
const fs = require('fs'); 

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes); 

// Serve the JSON file for job openings
app.get('/api/jobs', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'blind_people_jobs.json');

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File not found:", filePath);
      return res.status(404).send("File not found");
    }
    res.sendFile(filePath);
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
