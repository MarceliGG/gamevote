"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [games, setGames] = useState([]);
    const router = useRouter()
  const getGames = async () => {
    const response = await axios.get(`/api/games`);
    if (!response.data.error) setGames(response.data.games);
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <main className="flex items-center justify-center h-screen bg-accent2 gap-10">
      {games.map((game) => (
        <button
          key={game.id}
          className="bg-accent3 rounded-xl flex items-center flex-col justify-center h-80 w-96"
	  onClick={()=>router.push(`/game/${game.id}`)}
        >
          <img className="max-w-80 rounded-lg" src={game.data} />
          <h2 className="text-lg">{game.game_name}</h2>
          <h3 className="text-sm text-gray-300">by: {game.company_name}</h3>
        </button>
      ))}
    </main>
  );
}
