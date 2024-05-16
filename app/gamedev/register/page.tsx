"use client";

import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter("");
  const register = async (e) => {
    const form = e.target.parentNode;
    const name = form[0].value;
    const domain = form[1].value;
    const email = form[2].value;
    const pass1 = form[3].value;
    const pass2 = form[4].value;
    if (!name) {
      toast.error("Proszę podać nazwę firmy.");
      return;
    }
    if (!domain) {
      toast.error("Proszę podać stronę internetową firmy.");
      return;
    }
    if (
      !domain.match(
        /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
      )
    ) {
      toast.error("Niepoprawny adres strony internetowej.");
      return;
    }
    if (!email) {
      toast.error("Proszę podać adres e-mail.");
      return;
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      toast.error("Niepoprawny adres e-mail.");
      return;
    }
    if (!pass1) {
      toast.error("Hasło jest wymagane.");
      return;
    }
    if (pass1 !== pass2) {
      toast.error("Hasła muszą być takie same.");
      return;
    }

    const response = await axios.post("/api/register", {
      name: name,
      domain: domain,
      email: email,
      pass: pass1,
    });
    const data = response.data;
    if (data.error) {
      switch (data.message) {
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
        <h1 className="text-3xl mb-6">Zarejestruj Firmę</h1>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="name">Nazwa Firmy:</label>
          <input id="name" className="accent1"></input>
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="domain">Strona Internetowa Firmy:</label>
          <input id="domain" className="accent1"></input>
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="email">Adres E-mail:</label>
          <input id="email" type="email" className="accent1"></input>
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="password">Hasło:</label>
          <input id="password" type="password" className="accent1"></input>
        </div>
        <div className="flex flex-col items-center justify-center mb-4">
          <label htmlFor="password">Powtórz Hasło:</label>
          <input id="password" type="password" className="accent1"></input>
        </div>
        <button type="button" onClick={register} className="accent1 mb-2">
          Zarejestruj
        </button>
        <div className="flex flex-col items-center justify-center">
          <span>Twoja firma jest już zarejestrowana?</span>
          <Link href="./login">Zaloguj Się</Link>
        </div>
      </form>
    </main>
  );
}
