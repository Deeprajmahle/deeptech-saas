require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('MONGO_URI:', process.env.MONGO_URI);
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully!');
        
        // Get list of collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\nAvailable Collections:');
        collections.forEach(collection => console.log(`- ${collection.name}`));
        
        // Count documents in each collection
        console.log('\nDocument Counts:');
        for (const collection of collections) {
            const count = await mongoose.connection.db.collection(collection.name).countDocuments();
            console.log(`${collection.name}: ${count} documents`);
        }
        
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

testConnection();
