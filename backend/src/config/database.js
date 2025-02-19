// backend/src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            // Enable automatic index creation
            autoIndex: true,
            // Set the maximum number of connections in the pool
            maxPoolSize: 10,
            // Set the minimum number of connections in the pool
            minPoolSize: 2,
            // How long to wait for a response from the server before timing out
            socketTimeoutMS: 45000,
            // How long to wait for establishing new connections
            connectTimeoutMS: 10000,
            // Keep alive message interval
            heartbeatFrequencyMS: 10000
        });

        console.log(`MongoDB Connected: ${connection.connection.host}`);

        // Handle connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log('Mongoose connection closed through app termination');
                process.exit(0);
            } catch (err) {
                console.error('Error closing Mongoose connection:', err);
                process.exit(1);
            }
        });

        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Retry logic
        if (error.name === 'MongoServerSelectionError') {
            console.log('Retrying connection in 5 seconds...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            return connectDB();
        }
        process.exit(1);
    }
};

module.exports = connectDB;