/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ini memastikan pustaka modern yang menggunakan ES6/ESM (seperti lucide-react) 
  // diterjemahkan dengan benar agar dapat berfungsi di semua lingkungan.
  experimental: {
    esmExternals: true,
  },
  // Opsi ini juga dapat membantu memastikan stabilitas
  transpilePackages: ['lucide-react'],
};

module.exports = nextConfig;
