import React from 'react';
import Head from 'next/head';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>About Us - Nexus Threads</title>
        <meta name="description" content="Learn more about Nexus Threads and our mission to deliver high-quality apparel." />
      </Head>

      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-gray-800">Nexus Threads</a>
          <nav className="space-x-4">
            <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="/portfolio" className="text-gray-600 hover:text-gray-800">Portfolio</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-800">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-700">
          At Nexus Threads, we're weaving together innovative design and global style to craft high-quality apparel. Our commitment goes beyond fashion: we prioritize ethical production, enduring quality, and eco-conscious practices for a sustainable future.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          We believe in the power of creativity and craftsmanship, and we strive to bring you the best in modern fashion.
        </p>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Nexus Threads. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}