const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3001/:path*', // Proxy to Backend (port 3001)
            },
        ]
    },
};
export default nextConfig;
