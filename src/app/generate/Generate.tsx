'use client';
import { useState, FormEvent, useRef, MouseEvent, useEffect } from 'react';
import { generate } from '../../actions/actions';
import { Image } from "@nextui-org/image";
import { BackgroundBeams } from "../../components/ui/beams";
import { useParams } from 'next/navigation';

interface ImageResponse {
  msg: string;
  image: string | null;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
  radius: number;
}

export default function Generate() {
  const img: any = useParams();
  const imag: string = img.img;
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<'select' | 'erase' | null>(null);
  const [eraserSize, setEraserSize] = useState<number>(20);
  const [selectedRect, setSelectedRect] = useState<Rect | null>(null);
  const [erasedPoints, setErasedPoints] = useState<Point[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null);
  const [init, setInit] = useState<boolean>(img.img === 'new' ? false : true);

  useEffect(() => {
    const updateCanvasDimensions = () => {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      if (canvas && img) {
        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;
        canvas.style.width = `${img.clientWidth}px`;
        canvas.style.height = `${img.clientHeight}px`;
      }
    };

    window.addEventListener('resize', updateCanvasDimensions);
    updateCanvasDimensions();

    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, [image]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    async function handleGenerate() {
      setLoading(true);
      setError(null);
      try {
        const result: ImageResponse = await generate(prompt, selectedRect, erasedPoints);
        if (result.image) {
          setImage(result.image);
          setError(null);
        } else {
          setError(result.msg);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        clearCanvas()
        setLoading(false);
        setInit(true);
      }
    }

    handleGenerate();
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsDrawing(true);
    if (activeTool === 'select') {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setStartPoint({ x, y });
      }
    } else {
      drawCircle(e);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDrawing) {
      if (activeTool === 'select') {
        drawRectangle(e);
      } else {
        drawCircle(e);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setStartPoint(null);
  };

  const drawRectangle = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx && startPoint) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.5)'; // Purple with less opacity
        const width = x - startPoint.x;
        const height = y - startPoint.y;
        ctx.fillRect(startPoint.x, startPoint.y, width, height);
        setSelectedRect({ x: startPoint.x, y: startPoint.y, width, height });
      }
    }
  };

  const drawCircle = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const radius = eraserSize / 2; // Use eraserSize for both selection and eraser
        ctx.clearRect(x - radius, y - radius, radius * 2, radius * 2);
        setErasedPoints([...erasedPoints, { x, y, radius }]);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setErasedPoints([]);
        setSelectedRect(null);
      }
    }
  };

  return (
    <div className="h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-10 z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="flex flex-col items-center p-5">
        <h1 className="text-3xl font-bold mb-5">
          <span className=''>I</span>
          <span className=''>M</span> 
          <span className=''>A</span>  
          <span className='text-purple-500'>GEN</span>
        </h1>
        <div className='flex flex-col items-center sm:w-2/3 w-full gap-4 h-screen'>
          <div className="mt-5 w-full h-[70%] relative">
            <h2 className="text-xl font-semibold mb-3">Generated Image:</h2>
            <div className="w-full h-full max-w-full justify-center flex max-h-[500px] overflow-hidden relative">
              {init ? (
                <img 
                  ref={imageRef}
                  src={image || (!error?("/" + imag):"/404wbg.png" )} 
                  alt="Generated"
                  className="w-full h-full object-contain rounded-lg shadow-lg pointer-events-none" 
                  onLoad={() => {
                    const canvas = canvasRef.current;
                    const img = imageRef.current;
                    if (canvas && img) {
                      canvas.width = img.clientWidth;
                      canvas.height = img.clientHeight;
                      canvas.style.width = `${img.clientWidth}px`;
                      canvas.style.height = `${img.clientHeight}px`;
                    }
                  }}
                />
              ) : (
                <h1 className='relative top-32 text-center text-4xl text-white font-light'>Enter Prompt</h1>
              )}
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // To handle cases where the mouse leaves the canvas while drawing
                style={{ zIndex: 10, backgroundColor: 'transparent' }}
              />
            </div>
          </div>
          <div className="flex gap-4 z-20 flex-col items-center justify-center ">
            <div className='flex flex-row gap-2'>
              <button
                className={`p-2 rounded-lg ${activeTool === 'select' ? 'bg-purple-500' : 'bg-indigo-600'}`}
                onClick={() => setActiveTool(activeTool === 'select' ? null : 'select')}
                disabled={!init?true:false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                disabled={!init?true:false}
                className={`p-2 rounded-lg ${activeTool === 'erase' ? 'bg-purple-500' : 'bg-indigo-600'}`}
                onClick={() => setActiveTool(activeTool === 'erase' ? null : 'erase')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="6" rx="1" fill="#C4C4C4" />
                  <rect x="4" y="10" width="16" height="10" rx="1" fill="#E0E0E0" />
                  <rect x="6" y="10" width="12" height="10" rx="1" fill="#F5F5F5" />
                </svg>

              </button>
              <button
                className="p-2 rounded-lg bg-red-600"
                onClick={clearCanvas}
                disabled={!init?true:false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="w-full flex items-center mb-5">
              <label htmlFor="eraserSize" className="mr-3">Eraser:</label>
              <input
                id="eraserSize"
                type="range"
                min="5"
                max="50"
                value={eraserSize}
                disabled={!init?true:false || !(activeTool === "erase")}
                onChange={(e) => setEraserSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex z-20 sm:flex-row flex-col gap-2 items-center mb-5">
            <input
              type="text"
              value={error ? error : prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt"
              className={`border ${!error ? "text-black" : "text-red-500"} border-gray-300 p-2 rounded-lg w-80 mr-3`}
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-purple-700"
            >
              Generate
            </button>
          </form>
        
        </div>
      </div>

      <BackgroundBeams className='-z-10'/>
    </div>
  );
}
