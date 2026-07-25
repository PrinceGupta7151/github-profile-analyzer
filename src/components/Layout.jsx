import { Link } from "react-router-dom";

export default function Layout({ children }) {

  return (
    <div className="min-h-screen bg-black">
      <main className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </main>
    </div>
  );



}
