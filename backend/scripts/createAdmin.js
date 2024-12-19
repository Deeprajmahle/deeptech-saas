require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin123';

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        // Create or update admin user
        const admin = await User.findOneAndUpdate(
            { email: adminEmail },
            {
                name: 'Admin User',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin'
            },
            { upsert: true, new: true }
        );

        console.log('Admin user created/updated:', {
            email: admin.email,
            role: admin.role
        });

        console.log('\nUse these credentials to login:');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
};

createAdmin();
