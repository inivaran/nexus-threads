import React from 'react';
import Head from 'next/head';
import Link from 'next/link'; // For client-side navigation

// Your striking visual import (assuming it's in the public directory)
import HeroImage from '../../public/striking-visual.png';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nexus Threads - Where Innovation Threads into Global Style</title>
        <meta name="description" content="Your source for high-quality apparel designed for the UK market." />
        {/* Add other relevant meta tags */}
      </Head>

      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">Nexus Threads</Link>
          <nav className="space-x-4">
            <Link href="/portfolio" className="text-gray-600 hover:text-gray-800">Portfolio</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">About Us</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
      <section className="relative py-62 bg-gray-200 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={HeroImage.src}
              alt="Nexus Threads Design"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Where Innovation Threads into Global Style</h1>
            <p className="text-lg md:text-xl mb-8">Your source for high-quality apparel, designed with the UK market in mind.</p>
            <Link href="/portfolio" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full">
              Explore Our Designs
            </Link>
          </div>
        </section>

        {/* ... other sections (Why Nexus Threads, Portfolio, Contact, etc.) using JSX and Tailwind classes ... */}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Nexus Threads. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}