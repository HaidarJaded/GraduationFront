/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    publicRuntimeConfig: {
        apiUrl: 'https://haidarjaded787.serv00.net/',
        version: "0.0.1",
        build: "0000",
        updated_at: new Date(Date.now()).toUTCString(),
    },
    generateBuildId: async () => {
        // get the latest git commit hash here
        return '0.0.0.7'
    },
    output: 'export',
    images: {
        unoptimized: true
    },
    transpilePackages: ['@mui/x-charts']
}



module.exports = nextConfig
