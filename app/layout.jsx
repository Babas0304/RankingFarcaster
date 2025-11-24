// File ini mendefinisikan struktur HTML dasar untuk seluruh aplikasi.

import './globals.css'; // Sekarang file ini pasti sudah ada

export const metadata = {
  title: 'Farcaster Mini Ranking',
  description: 'Leaderboard sederhana yang dibuat dengan Next.js dan Vercel.',
};

// Komponen RootLayout ini akan membungkus semua halaman (termasuk page.jsx Anda)
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* 'children' adalah konten dari app/page.jsx Anda */}
        {children}
      </body>
    </html>
  );
}
