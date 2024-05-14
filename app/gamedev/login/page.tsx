import Link from "next/link";

export const metadata: Metadata = {
  title: "Zaloguj Się",
};

export default function Test() {
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
        <button type="button" className="accent1 mb-2">
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
