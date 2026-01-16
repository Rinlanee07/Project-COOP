console.log('Environment check:');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('Expected:', 'http://localhost:3002');

export default function EnvTest() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Environment Variable Test</h1>
            <div className="bg-gray-100 p-4 rounded">
                <p><strong>NEXT_PUBLIC_API_URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'NOT SET'}</p>
                <p><strong>Expected:</strong> http://localhost:3002</p>
            </div>
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={async () => {
                    const url = `${process.env.NEXT_PUBLIC_API_URL || '/api'}/auth/login`;
                    console.log('Testing fetch to:', url);
                    try {
                        const res = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: 'test@test.com', password: 'test' })
                        });
                        console.log('Response status:', res.status);
                        const data = await res.json();
                        console.log('Response data:', data);
                        alert('Check console for results');
                    } catch (err) {
                        console.error('Fetch error:', err);
                        alert('Error: ' + err);
                    }
                }}
            >
                Test API Connection
            </button>
        </div>
    );
}
