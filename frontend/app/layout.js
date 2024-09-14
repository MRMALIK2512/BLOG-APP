import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog Platform',
  description: 'Simple blog platform with Next.js and ShadCN',
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='w-full '>
        <nav className='max-w-[750px] mx-auto flex items-center justify-between py-3 '>
            <Link href='/'>
            <h1 className='text-xl'>
              BLOG PAGE
            </h1>
            </Link>
            <div className='flex gap-16'>
            <Link href="/" className='text-xl'>Home</Link>  <Link href="/create" className='text-xl'>Create Post</Link>
            </div>
          </nav>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
