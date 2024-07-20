'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getImages } from '../../actions/actions';
import { Image } from "@nextui-org/image";

interface ImageResponse {
  msg: string;
  images: Array<{ image: string; time: number }>;
}

export default function Explore() {
  const [images, setImages] = useState<Array<{ image: string; time: number }> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const result: any = await getImages();
        if (result.images) {
          setImages(result.images);
        } else {
          setError(result.msg);
        }
      } catch (e: any) {
        setError(e.message);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-5">Explore Your Generated Images</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images && images.map((img, index) => (
          <div key={index} className="p-3 border border-gray-300 flex flex-col justify-center items-center rounded-lg bg-stone-950">
            <Image
              src={img.image}
              alt={`Generated ${index}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Link href={`/generate/${img.image}`}>
              <h1 className="block mt-2 text-center text-indigo-500 hover:text-indigo-700">Generate Similar</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
