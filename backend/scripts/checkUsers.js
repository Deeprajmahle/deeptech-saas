require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function checkUsers() {
    try {
        console.log('Connecting to MongoDB...');
        console.log('MONGO_URI:', process.env.MONGO_URI);
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({}).select('-password');
        console.log('\nUsers in database:', users.length);
        users.forEach(user => {
            console.log('User:', {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nConnection closed');
    }
}

checkUsers();
