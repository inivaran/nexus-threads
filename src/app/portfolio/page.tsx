import React from 'react';
import Head from 'next/head';

export default function Portfolio() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Portfolio - Nexus Threads</title>
        <meta name="description" content="Explore our portfolio of high-quality apparel designs." />
      </Head>

      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-gray-800">Nexus Threads</a>
          <nav className="space-x-4">
            <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="/about" className="text-gray-600 hover:text-gray-800">About Us</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-800">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-lg text-gray-700 mb-8">
          Discover our collection of innovative and stylish apparel designs tailored for the UK market.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example portfolio items */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/portfolio-item1.jpg" alt="Portfolio Item 1" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">Design 1</h2>
              <p className="text-gray-600">A modern and stylish design for casual wear.</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/portfolio-item2.jpg" alt="Portfolio Item 2" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">Design 2</h2>
              <p className="text-gray-600">Elegant and professional attire for formal occasions.</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/portfolio-item3.jpg" alt="Portfolio Item 3" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">Design 3</h2>
              <p className="text-gray-600">Comfortable and trendy activewear for everyday use.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Nexus Threads. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}