"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();
  const getGames = async () => {
    const response = await axios.get(`/api/games`);
    console.log(response.data.games);
    if (!response.data.error) setGames(response.data.games);
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <main className="flex items-center flex-col justify-center h-screen bg-accent2 gap-10">
      <div className="w-[100%] bg-accent3 fixed top-0 p-4">
        Central Europe Gamedev & E-Careers Festival to dwudniowe wydarzenie,
        które odbędzie się 6 i 7 czerwca 2024 roku w Międzynarodowym Centrum
        Kongresowym w Katowicach. Potrzeby i oczekiwania rynku pracy w obszarze
        sektorów kreatywnych – gaming, gamedev i esport, skłoniły organizatorów,
        do stworzenia imprezy z pogranicza edukacji, rozrywki oraz rozwoju
        gospodarczego.{" "}
      </div>
      {!sessionStorage.getItem("vote_pass") && (
        <div className="w-[100%] bg-accent3 fixed bottom-0 p-4">
          Głosowanie wyłączone! Podaj hasło aby włączyć.
          <input type="password" className="accent1" id="vote_pass" />
          <button
            className="accent1 mb-2"
            onClick={() => {
              sessionStorage.setItem(
                "vote_pass",
                document.getElementById("vote_pass").value,
              );
            }}
          >
            OK
          </button>
        </div>
      )}
      {games.map((game) => (
        <button
          key={game.id}
          className="bg-accent3 rounded-xl flex items-center flex-col justify-center h-80 w-96"
          onClick={() => router.push(`/game/${game.id}`)}
        >
          <img
            className="max-w-80 rounded-lg"
            src={game.data}
            alt="[Image not loaded]"
          />
          <h2 className="text-lg">{game.game_name}</h2>
          <h3 className="text-sm text-gray-300">by: {game.company_name}</h3>
        </button>
      ))}
    </main>
  );
}
