"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Game({ params }) {
  const [company, setCompany] = useState({});
  const [gameData, setGameData] = useState({});
  const [images, setImages] = useState([]);
  const router = useRouter();
  const id = params.id;

  const getGameData = async () => {
    const response = await axios.get(`/api/game_data?id=${id}`);
    if (!response.data.error) setGameData(response.data.data);
  };

  const getImages = async () => {
    const response = await axios.get(`/api/images?id=${id}`);
    if (!response.data.error) {
      setImages(response.data.data);
    } else toast.warning(`API returned error: '${data.message}'`);
  };

  const getCompany = async () => {
    const response = await axios.get(`/api/company_data?id=${id}`);
    if (!response.data.error) setCompany(response.data.data);
  };
    
const carRes = {
  res: {
    breakpoint: { max: 5000, min: 0 },
    items: 1
  }}

  useEffect(() => {
    getCompany();
    getGameData();
    getImages();
  }, []);

  return (
    <main className="flex items-center justify-center h-screen bg-accent2 gap-10 flex-col w-screen">
      <section className="bg-accent3 p-4 rounded-lg w-[90%]">
	  <button onClick={()=>console.log(images)}>aaa</button>
        <Carousel className="w-[100%]" responsive={carRes} infinite>
          {images.map((img) => (
            <img key={img.id} className="" src={img.data} />
          ))}
        </Carousel>
      </section>
      <section className="bg-accent3 p-4 rounded-lg flex gap-10">
        <div>
          <h1 className="text-xl">{gameData.name}</h1>
          <Link href={`//${gameData.website}`}>{gameData.website}</Link>
        </div>
        <div>
          <h2 className="text-xl text-gray-300">by: {company.name}</h2>
          <Link href={`//${company.domain}`}>{company.domain}</Link>
        </div>
      </section>
    </main>
  );
}
