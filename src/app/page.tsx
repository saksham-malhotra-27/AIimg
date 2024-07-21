"use client"
import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { Vortex } from '@/components/ui/vortex';
export default function Home() {
  return (
    <main className="overflow-hidden w-full    flex flex-col items-center justify-center min-h-screen h-full  text-white">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        className="flex items-center  flex-col justify-center px-2 md:px-10  py-4 w-full h-fit"
      >

      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Generate Images',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Generate Emotions',
        1000,
        'Generate with us',
        1000,
      ]}
       className="sm:text-6xl text-3xl font-bold mb-8 animate-pulse "
      wrapper="span"
      speed={50}
      style={{  display: 'inline-block' }}
      repeat={Infinity}
      />
      <p className="text-xl mb-4 animate-fade-in">Images using artificial intelligence</p>
      <div className="flex space-x-4">
        <Link href="/explore">
          <button className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl text-lg font-semibold transition duration-300 transform hover:scale-105">Explore</button>
        </Link>
        <Link href="/generate/new">
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105">Generate</button>
        </Link>
        <Link href="/profile">
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-lg font-semibold transition duration-300 transform hover:scale-105">Profile</button>
        </Link>
      </div>
      </Vortex>
    </main>
  );
}
