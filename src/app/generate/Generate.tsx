'use client';
import { useState, FormEvent, useEffect } from 'react';
import { generate } from '../../actions/actions';
import { Image } from "@nextui-org/image";
import { BackgroundBeams } from "../../components/ui/beams";
import { useParams } from 'next/navigation';

interface ImageResponse {
  msg: string;
  image: string | null;
}

export default function Generate() {

  
  const img:any = useParams();
  const imag: string = img.img;
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(img.img==='new'?false:true)
 
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    async function handleGenerate() {
      setLoading(true);
      setError(null);
      try {
        const result: ImageResponse = await generate(prompt);
        if (result.image) {
          setImage(result.image);
          setError(null);
        } else {
          setError(result.msg);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
        setInit(true)
      }
    }

    handleGenerate();
   
  };


  return (
    <div className=" h-full relative">

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-10 z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="flex flex-col items-center p-5 ">
        <h1 className="text-3xl font-bold mb-5">
          <span className=''>I</span>
          <span className=''>M</span> 
          <span className=''>A</span>  
          <span className=' text-purple-500'>GEN</span>
        </h1>
        <div className='flex flex-col items-center sm:w-2/3 w-full gap-4 h-screen'>
          <div className="mt-5 w-full h-[70%]">
            <h2 className="text-xl font-semibold mb-3">Generated Image:</h2>
            <div className="w-full h-full max-w-full justify-center flex max-h-[500px] overflow-hidden">
             { init?<Image 
                src={image || "/"+ imag || '/404wbg.png'} 
                alt="Generated"
                
                className="w-full h-full object-contain rounded-lg shadow-lg" 
              /> : 
              <h1 className=' relative top-32 text-center text-4xl text-white font-light'>Enter Prompt</h1>}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex z-20 sm:flex-row flex-col gap-2 items-center mb-5">
            <input
              type="text"
              value={error?error:prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt"
              className={`border ${ !error? "text-black" : "text-red-500"} border-gray-300 p-2 rounded-lg w-80 mr-3`}
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-purple-700"
            >
              Generate
            </button>
          </form>
          <div className="min-h-[24px] w-full text-center">
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      <BackgroundBeams className=' -z-10'/>

    </div>
  );
}
