"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const login = async (e) => {
    const form = e.target.parentNode;
    const email = form[0].value;
    const pass = form[1].value;
    if (!email) {
      toast.error("Proszę podać adres e-mail.");
      return;
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      toast.error("Niepoprawny adres e-mail.");
      return;
    }
    if (!pass) {
      toast.error("Hasło jest wymagane.");
      return;
    }

    const response = await axios.post("/api/login", {
      email: email,
      pass: pass,
    });
    const data = response.data;
    if (data.error) {
      switch (data.message) {
        case "incorrect credentials":
          toast.error("Niepoprawny adres e-mail lub hasło.");
          break;
        default:
          toast.warning(`API returned error: '${data.message}'`);
      }
    } else {
      sessionStorage.setItem("token", data.token);
      router.push("/gamedev");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-accent2">
      <form className="flex flex-col items-center justify-center p-10 rounded-xl bg-accent3 gap-2">
        <h1 className="text-3xl mb-6">Zaloguj Się</h1>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="email">Adres Email:</label>
          <input id="email" type="email" className="accent1"></input>
        </div>
        <div className="flex flex-col items-center justify-center mb-4">
          <label htmlFor="password">Hasło:</label>
          <input id="password" type="password" className="accent1"></input>
        </div>
        <button type="button" onClick={login} className="accent1 mb-2">
          Zaloguj Się
        </button>
        <div className="flex flex-col items-center justify-center">
          <span>Twoja firma nie jest jeszcze zarejestrowana?</span>
          <Link href="./register">Zarejestruj Firmę</Link>
        </div>
      </form>
    </main>
  );
}
