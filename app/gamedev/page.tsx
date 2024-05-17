"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const token = sessionStorage.getItem("token");
  if (!token) useRouter().push("/gamedev/register");

  const [gameData, setGameData] = useState({});
  const [images, setImages] = useState([]);

  const getGameData = async () => {
    const response = await axios.get(`/api/game_data?token=${token}`);
    if (!response.data.error) setGameData(response.data.data);
  };

  const getImages = async () => {
    const response = await axios.get(`/api/images?token=${token}`);
    if (!response.data.error) {
      setImages(response.data.data);
    } else toast.warning(`API returned error: '${data.message}'`);
  };

  const uploadImage = async () => {
    const input = document.getElementById("file");
    const reader = new FileReader();
    if (!input.files.length) {
      toast.error("No file selected.");
      return;
    }
    let imgData;
    reader.onload = async () => {
      imgData = reader.result;
      const response = await axios.post("/api/images", {
        token: token,
        imgData: imgData,
      });
      const data = response.data;
      if (data.error) {
        switch (data.message) {
          default:
            toast.warning(`API returned error: '${data.message}'`);
        }
      }
    };
    reader.readAsDataURL(input.files[0]);
    getImages();
  };

  const updateGameData = async (e) => {
    const form = e.target.parentNode;
    const name = form[0].value;
    const website = form[1].value;
    const type = form[2].value;
    const date = form[3].value;
    const desc = form[4].value;
    const response = await axios.post("/api/game_data", {
      token: token,
      name: name,
      website: website,
      type: type,
      premiere_date: date,
      description: desc,
    });
    const data = response.data;
    if (data.error) {
      switch (data.message) {
        default:
          toast.warning(`API returned error: '${data.message}'`);
      }
    }
  };

  const deleteImage = async (key) => {
    const response = await fetch("/api/images", {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({token: token, id: key}), // body data type must match "Content-Type" header
    });
    getImages();
  };

  useEffect(() => {
    getGameData();
    getImages();
  }, []);

  return (
    <main className="flex items-center justify-center h-screen bg-accent2 gap-10">
      <div className="flex flex-col items-center justify-center p-10 rounded-xl bg-accent3 gap-2 w-[60%] h-[90%]">
        <label htmlFor="file">Dodaj Obraz</label>
        <input
          type="file"
          id="file"
          accept="image/png, image/jpeg"
          className="accent1"
        />
        <button onClick={uploadImage} className="accent1 mb-2">
          Dodaj
        </button>
        <div className="h-[90%] overflow-scroll flex w-[100%] gap-2 flex-wrap flex-col">
          {images.map((img) => (
            <div key={img.id}>
              <img className="max-w-80" src={img.data} />
              <button
                onClick={() => deleteImage(img.id)}
                className="accent1 mb-2"
              >
                Usuń
              </button>
            </div>
          ))}
        </div>
      </div>
      <form className="flex flex-col items-center justify-center p-10 rounded-xl bg-accent3 gap-2 h-[90%]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl mb-6">Informacje o Grze</h1>
          <label htmlFor="name">Nazwa:</label>
          <input
            id="name"
            defaultValue={gameData.name}
            type="text"
            className="accent1"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="website">Strona Internetowa:</label>
          <input
            id="website"
            defaultValue={gameData.website}
            type="text"
            className="accent1"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="type">Typ Gry:</label>
          <input
            id="type"
            defaultValue={gameData.type}
            type="text"
            className="accent1"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="type">Data Premiery:</label>
          <input
            id="date"
            defaultValue={gameData.premiere_date?.replace("T00:00:00.000Z", "")}
            type="date"
            className="accent1 w-[232px]"
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-4">
          <label htmlFor="type">Opis:</label>
          <textarea
            id="date"
            defaultValue={gameData.description}
            type="date"
            className="bg-accent1 h-60 rounded-md text-black px-2 py-1"
          />
        </div>
        <button type="button" onClick={updateGameData} className="accent1 mb-2">
          Zaktualizuj
        </button>
      </form>
    </main>
  );
}
