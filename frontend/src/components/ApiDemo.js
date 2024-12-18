import React, { useState } from 'react';
import api from '../config/api';

function ApiDemo() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // GET example - Get all users
    const handleGetUsers = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await api.get('/api/users');
            setResult(JSON.stringify(response, null, 2));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // POST example - Create a new user
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const response = await api.post('/api/users', userData);
            setResult(JSON.stringify(response, null, 2));
            // Clear form
            setUserData({ name: '', email: '', password: '' });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // PUT example - Update a user
    const handleUpdateUser = async (userId) => {
        try {
            setLoading(true);
            setError('');
            const response = await api.put(`/api/users/${userId}`, {
                name: userData.name
            });
            setResult(JSON.stringify(response, null, 2));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // DELETE example - Delete a user
    const handleDeleteUser = async (userId) => {
        try {
            setLoading(true);
            setError('');
            const response = await api.delete(`/api/users/${userId}`);
            setResult(JSON.stringify(response, null, 2));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">API Operations Demo</h2>
            
            {/* Create User Form */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Create New User</h3>
                <form onSubmit={handleCreateUser} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={(e) => setUserData({...userData, password: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        Create User
                    </button>
                </form>
            </div>

            {/* Other Operations */}
            <div className="space-x-4 mb-8">
                <button
                    onClick={handleGetUsers}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    disabled={loading}
                >
                    Get All Users
                </button>
                <button
                    onClick={() => handleUpdateUser('user-id')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    disabled={loading}
                >
                    Update User
                </button>
                <button
                    onClick={() => handleDeleteUser('user-id')}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={loading}
                >
                    Delete User
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-blue-500 mb-4">Loading...</div>
            )}

            {/* Error Display */}
            {error && (
                <div className="text-red-500 mb-4">
                    Error: {error}
                </div>
            )}

            {/* Result Display */}
            {result && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Result:</h3>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                        {result}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default ApiDemo;
