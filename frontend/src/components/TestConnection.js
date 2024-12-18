import React, { useEffect, useState } from 'react';
import api from '../config/api';

function TestConnection() {
    const [status, setStatus] = useState('Testing connection...');

    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await api.get('/');
                setStatus('Backend connection successful! Response: ' + JSON.stringify(response));
            } catch (error) {
                setStatus('Connection error: ' + error.message);
            }
        };

        testConnection();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Backend Connection Test</h2>
            <div style={{ 
                padding: '10px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                marginTop: '10px'
            }}>
                {status}
            </div>
        </div>
    );
}

export default TestConnection;
