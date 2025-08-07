'use client'

import React, { useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const MAX_MESSAGE_LENGTH = 2000;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = formRef.current;
    if (!form) return;

    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value.trim();

    // Client-side validation
    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      setError(`Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    const data = { name, email, message };
    try {
      const res = await fetch('https://47fou6hiii.execute-api.eu-west-2.amazonaws.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess('Thank you for getting in touch! We will get back to you soon.');
        form.reset();
      } else {
        const result = await res.text();
        setError(result || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Contact Us - Nexus Threads</title>
        <meta name="description" content="Get in touch with Nexus Threads for inquiries or support." />
      </Head>

      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">Nexus Threads</Link>
          <nav className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
            <Link href="/portfolio" className="text-gray-600 hover:text-gray-800">Portfolio</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">About Us</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-700">
          We&apos;d love to hear from you! Whether you have questions about our products or need support, feel free to reach out.
        </p>
        <form ref={formRef} className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Message"
            ></textarea>
          </div>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          {success && <div className="text-green-600 mb-2">{success}</div>}
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Nexus Threads. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}