import React from 'react';
import Head from 'next/head';
import Link from 'next/link'; 

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>About Us - Nexus Threads</title>
        <meta name="description" content="Learn more about Nexus Threads and our mission to deliver high-quality apparel." />
      </Head>

      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">Nexus Threads</Link>
          <nav className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
            <Link href="/portfolio" className="text-gray-600 hover:text-gray-800">Portfolio</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* About Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-700">
            At Nexus Threads, we're weaving together innovative design and global style to craft high-quality apparel. Our commitment goes beyond fashion: we prioritize ethical production, enduring quality, and eco-conscious practices for a sustainable future.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            We believe in the power of creativity and craftsmanship, and we strive to bring you the best in modern fashion.
          </p>
        </section>
        
        {/* Asthetics Section */}
        <section className="mb-12 flex flex-col md:flex-row items-center bg-gray-100 rounded-lg shadow-md p-6">
          <div className="md:w-1/2 w-full mb-6 md:mb-0 md:mr-8 flex justify-center">
            <img
              src="/british-fashion.jpg"
              alt="Design Aesthetics"
              className="rounded-lg shadow-lg w-full max-w-2xl object-cover" // Increased max width
              style={{ minHeight: '320px', maxHeight: '480px' }} // Ensures image is taller
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl font-bold mb-4">Our Design Philosophy - Where Creativity Meets Aesthetics</h2>
            <p className="text-lg text-gray-700 mb-4">
              At Nexus Threads, our design aesthetic is born from a passion for innovation, meticulously woven with a deep understanding of the evolving tastes and trends of the UK market. Our talented design team draws inspiration from global style currents, filtering them through a distinctly British lens to create collections that resonate with your discerning customers. We don't just follow trends; we strive to anticipate them, offering unique silhouettes, captivating details, and a fresh perspective that sets your inventory apart.
            </p>
          </div>
        </section>

        {/* Consciously Crafted Section */}
        <section className="mb-12 flex flex-col md:flex-row items-center bg-green-50 rounded-lg shadow-md p-6">
          <div className="md:w-1/2 w-full mb-6 md:mb-0 md:mr-8 flex justify-center">
            <img
              src="/sustainability.png"
              alt="Consciously Crafted"
              className="rounded-lg shadow-lg w-full max-w-2xl object-cover" // Increased max width
              style={{ minHeight: '320px', maxHeight: '480px' }} // Ensures image is taller
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl font-bold mb-4">Consciously Crafted - Our Commitment to Sustainable Practices</h2>
            <p className="text-lg text-gray-700 mb-4">
              We believe that beautiful apparel shouldn't come at the expense of our planet. Sustainability is at the heart of everything we do at Nexus Threads. We are committed to minimizing our environmental footprint through conscious choices at every stage of our process. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <span className="font-semibold">Sourcing with Integrity:</span> We meticulously source our materials from certified suppliers, ensuring that our fabrics meet rigorous environmental and social standards. From organic cotton to recycled fibers, we prioritize options that reduce waste and conserve resources.
              </li>
              <li>
                <span className="font-semibold">Eco-Friendly Practices:</span> We continuously seek and implement innovative, eco-friendly production methods to minimize water and energy consumption and reduce our overall impact.
              </li>
            </ul>
          </div>
        </section>
        
        {/* The Art of Quality Section */}
        <section className="mb-12 flex flex-col md:flex-row items-center bg-gray-100 rounded-lg shadow-md p-6">
          <div className="md:w-1/2 w-full mb-6 md:mb-0 md:mr-8 flex justify-center">
            <img
              src="/stiches.jpg"
              alt="Excellence in Every Stitch"
              className="rounded-lg shadow-lg w-full max-w-md object-cover"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl font-bold mb-4">The Art of Quality - Excellence in Every Stitch</h2>
            <p className="text-lg text-gray-700 mb-4">
              Quality is non-negotiable at Nexus Threads. We are dedicated to producing apparel that not only looks exceptional but is also crafted to last. Our commitment to quality production is evident in every detail:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <span className="font-semibold">Precision Craftsmanship:</span> Our skilled production partners adhere to the highest standards, ensuring meticulous attention to detail from pattern cutting to finishing.
              </li>
              <li>
                <span className="font-semibold">Uncompromising Stitch Quality:</span> We pay close attention to the quality of every stitch, ensuring durability and a superior finish that reflects the value of your brand.
              </li>
              <li>
                <span className="font-semibold">Rigorous Quality Control:</span> Each garment undergoes thorough inspection to meet our exacting standards before it reaches you.
              </li>
            </ul>
          </div>
        </section>
    
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Nexus Threads. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}