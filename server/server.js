// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Routes
const authRoute = require("./routes/AuthRoute");
const questionRoute = require("./routes/QuestionRoute");
const userQuestionRoute = require("./routes/UserQuestionRoute");

dotenv.config();

const app = express();

const { MONGODB_URI } = process.env;

// Middleware
app.use(cors({
  origin: "https://leet-quest.vercel.app", 
  credentials: true 
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB is connected successfully'))
.catch((err) => console.log(err));

app.use(cookieParser());
app.use("/", authRoute);

// Routes
app.use('/api/auth', authRoute);
app.use('/api/questions', questionRoute);
app.use('/api/user-questions', userQuestionRoute);

app.get('/', (req, res) => {
    res.send('Welcome to DSA Tracker Server');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
