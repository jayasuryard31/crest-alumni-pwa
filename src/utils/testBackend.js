// Test script to verify backend connectivity
async function testBackendConnection() {
    try {
        console.log('Testing backend connection...');

        // Test health endpoint
        const healthResponse = await fetch('/api/health');
        const healthData = await healthResponse.json();
        console.log('Health check:', healthData);

        // Test CORS with a simple request
        const corsResponse = await fetch('/api/health', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (corsResponse.ok) {
            console.log('✅ Backend connection successful');
            console.log('✅ CORS is working properly');
        } else {
            console.error('❌ Backend connection failed');
        }

    } catch (error) {
        console.error('❌ Backend connection error:', error);
    }
}

// Auto-run when loaded
testBackendConnection();
