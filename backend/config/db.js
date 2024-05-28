const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;




// MONGODB_URI = mongodb+srv://thanhngodev:S2bQdcsPigFzVmbv@store-mern-app.f1dgaqw.mongodb.net/store-app?retryWrites=true&w=majority&appName=store-mern-app
// PORT = 8080
// TOKEN_SECRET_KEY = thanhngo2010
// FRONTEND_URL = http://localhost:3000