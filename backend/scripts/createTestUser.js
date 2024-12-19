const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGO_URI = 'mongodb+srv://deep:Mongo2024@cluster0.cu5yv.mongodb.net/istdb?retryWrites=true&w=majority&appName=Cluster0';

const createTestUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Test credentials
        const testEmail = 'test@example.com';
        const testPassword = 'password123';

        // Check if user exists
        let user = await User.findOne({ email: testEmail });
        
        if (user) {
            console.log('Test user already exists');
            console.log('Email:', user.email);
            console.log('Role:', user.role);
            
            // Test password match
            const isMatch = await bcrypt.compare(testPassword, user.password);
            console.log('Password matches:', isMatch);
        } else {
            // Create test user
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(testPassword, salt);

            user = await User.create({
                name: 'Test User',
                email: testEmail,
                password: hashedPassword,
                role: 'admin'
            });

            console.log('Created new test user:');
            console.log('Email:', user.email);
            console.log('Role:', user.role);
        }

        // List all users
        const users = await User.find({}, '-password');
        console.log('\nAll users in database:');
        console.log(JSON.stringify(users, null, 2));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

createTestUser();
