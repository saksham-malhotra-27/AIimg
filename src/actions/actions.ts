'use server';
import { signOut } from "@/app/auth";
import { kv } from "@vercel/kv";
import { auth } from '@/app/auth'


const images = ["/img1.png", "/img2.jpg", "/img3.jpg", "/img4.png"];

export const generate = async (Prompt:string, selected:any, erased:any)=> {
    const session = await auth();
    if(!session){
        return{ msg:"Not Signed In",image:null};
    }
    const user:any = await kv.get(session.user?.email!);
    const currentTime = Date.now();
    const oneHour = 3600000;
    const recentImages = user.images.filter((img:any) => currentTime - img.time < oneHour);
    if(recentImages.length >=3){
        return {msg:"Get your image next hour", image:null}
    } else {
    const image = images[Math.floor(Math.random() * images.length)];
    user.images.push({ image, time: currentTime });
    await kv.set(session.user?.email!, user);

    return {msg:"Image generated",image:image};
}
}

export const getImages = async ()=>{
    const session = await auth();
    if(!session){
        return{ msg:"Not Signed In",images:null};
    }
    const user:any = await kv.get(session.user?.email!);
    return {msg:"Image generated",images:user.images};
}

export async function getRandomSampleImages() {
    return {
      images: [
        { image: '/race.jpg', type: 'Adrenaline booster' },
        { image: '/second.jpg', type: 'Abstract' },
        { image: '/art.jpg', type: 'Art' },
        { image: '/white sketch.jpg', type: 'Neon Sketches' },
      ]
    };
  }

export const handleLogout = async ()=>{
await signOut();
}