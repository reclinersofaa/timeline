const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const userRoutes = require('../routes/user');
const userDetailsRoutes = require('../routes/userdet');
const futureMeRoutes = require('../routes/future');
const timelineRoutes = require('../routes/timelineR');

dotenv.config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT =  5000;
app.use('/api', userRoutes);
app.use('/api', userDetailsRoutes);			
app.use('/api', futureMeRoutes);
app.use('/api', timelineRoutes); 
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
	res.send('Welcome to the backend!');
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
