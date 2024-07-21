'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getImages, getRandomSampleImages } from '../../actions/actions';
import { Image } from "@nextui-org/image";
import { InfiniteMovingCards } from '@/components/ui/cards';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BackgroundGradient } from '@/components/ui/back';
import { Vortex } from '@/components/ui/vortex';

interface ImageResponse {
  msg: string;
  images: Array<{ image: string; time: number }>;
}

const testimonials = [
  {
    quote: "Using this AI image generator was like watching magic unfold before my eyes. The images were stunning and exactly what I envisioned!",
    name: "Alice Johnson",
    title: "Digital Artist",
  },
  {
    quote: "This tool has revolutionized my creative process. I can now generate high-quality images for my projects in minutes.",
    name: "David Kim",
    title: "Graphic Designer",
  },
  {
    quote: "As a content creator, having the ability to quickly generate unique images is invaluable. This AI is a game-changer!",
    name: "Sarah Lee",
    title: "Content Creator",
  },
  {
    quote: "The AI's ability to interpret text prompts and create beautiful images is simply amazing. It's like having an artist on demand.",
    name: "Michael Brown",
    title: "Marketing Specialist",
  },
  {
    quote: "I've tried many image generators, but this one stands out with its accuracy and creativity. Highly recommend it!",
    name: "Jessica Turner",
    title: "Freelance Illustrator",
  },
];

export default function Explore() {
  const [images, setImages] = useState<Array<{ image: string; time: number }> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [visibleImagesCount, setVisibleImagesCount] = useState<number>(4);
  const [randomImages, setRandomImages] = useState<Array<{ image: string; type: string }> | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const result: ImageResponse = await getImages();
        if (result.images) {
          setImages(result.images);
        } else {
          setError(result.msg);
        }
      } catch (e: any) {
        setError(e.message);
      }
    }

    async function fetchRandomImages() {
      try {
        const result = await getRandomSampleImages();
        setRandomImages(result.images);
      } catch (e: any) {
        console.error('Error fetching random images:', e.message);
      }
    }

    fetchImages();
    fetchRandomImages();
  }, []);

  const handleViewMore = () => {
    setVisibleImagesCount(prevCount => prevCount + 4);
  };

  return (
    <main className="overflow-hidden w-full    flex flex-col items-center justify-center  h-full  text-white">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        className=" w-full h-full"
        sm={true}
      >
      <div className="flex flex-col w-full h-full items-center justify-center gap-10">
        <div className="flex flex-col w-full items-center p-5">
          {error && <p className="text-red-500">{error}</p>}

          <div className="my-10 w-full">
            <h2 className="text-4xl text-center font-semibold mb-4">Discover What Our AI Can Do</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {randomImages ? (
                randomImages.map((img, index) => (
                  <BackgroundGradient key={index} className="rounded-[22px] p-4 bg-zinc-900">
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      <Link href="/generate/new">
                        <div>
                          <Image
                            src={img.image}
                            alt={`Random Sample ${index}`}
                            className="w-60 h-48 object-cover rounded-lg"
                          />
                          <h3 className="mt-2 text-center text-indigo-500 hover:text-indigo-700">{img.type}</h3>
                        </div>
                      </Link>
                    </div>
                  </BackgroundGradient>
                ))
              ) : (
                Array.from({ length: 4 }).map((_, index) => (
                  <BackgroundGradient key={index} className="rounded-[22px] p-4 bg-zinc-900">
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      <Skeleton height={192} width="100%" className="w-full" />
                      <Skeleton height={20} width="100%" className="mt-2" />
                    </div>
                  </BackgroundGradient>
                ))
              )}
            </div>
          </div>

          <div className="w-full overflow-hidden flex justify-center items-center min-h-[200px]">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </div>

        {images && <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl font-bold mb-5">Explore Your Generated Images</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {images ? (
              images
                .sort((a, b) => b.time - a.time)
                .slice(0, visibleImagesCount)
                .map((img, index) => (
                  <BackgroundGradient key={index} className="rounded-[22px] p-4 bg-zinc-900">
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      <Link href={`/generate${img.image}`}>
                        <div>
                          <Image
                            src={img.image}
                            alt={`Random Sample ${index}`}
                            className="w-60 h-48 object-cover rounded-lg"
                          />
                          <h3 className="mt-2 text-center text-indigo-500 hover:text-indigo-700">Generate Similar</h3>
                        </div>
                      </Link>
                    </div>
                  </BackgroundGradient>
                ))
            ) : (
              Array.from({ length: 4 }).map((_, index) => (
                <BackgroundGradient key={index} className="rounded-[22px] p-4 bg-zinc-900">
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <Skeleton height={192} width="100%" className="w-full" />
                  <Skeleton height={20} width="100%" className="mt-2" />
                </div>
              </BackgroundGradient>
              ))
            )}
          </div>
          {images && visibleImagesCount < images.length && (
            <button
              onClick={handleViewMore}
              className="mt-5 px-4 py-2 my-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
            >
              View More
            </button>
          )}
        </div>}
        {!images && <h1 className="text-3xl font-bold mb-5">Generate some images to get this explore feed </h1>}
      </div>
      </Vortex>

    </main>
  );
}
