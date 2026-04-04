const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db.js');
const authRoutes = require('./routes/auth.js');
const bookingsRoutes = require('./routes/bookings.js');
const eventsRoutes = require('./routes/events.js');
const path = require('path');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//middlewares
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/events',eventsRoutes);
app.use('/api/bookings',bookingsRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")))
    app.get(/^\/.*$/, (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist", "index.html"))
    })
}

connectDB();
app.listen(PORT,()=>{
    console.log("Server running on port : ",PORT);
})