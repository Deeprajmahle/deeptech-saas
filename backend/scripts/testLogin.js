require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const testLogin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Test credentials
        const testEmail = 'test@example.com';
        const testPassword = 'password123';

        // Find the test user
        const user = await User.findOne({ email: testEmail });
        console.log('Found user:', user ? 'Yes' : 'No');

        if (!user) {
            // Create test user if it doesn't exist
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(testPassword, salt);

            const newUser = await User.create({
                name: 'Test User',
                email: testEmail,
                password: hashedPassword,
                role: 'admin'
            });

            console.log('Created test user:', newUser.email);
        } else {
            // Test password match
            const isMatch = await bcrypt.compare(testPassword, user.password);
            console.log('Password matches:', isMatch);
        }

        // List all users
        const allUsers = await User.find({}, 'email role');
        console.log('\nAll users in database:');
        console.log(allUsers);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

testLogin();
