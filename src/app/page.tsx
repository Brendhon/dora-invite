import Illustration from "@/components/Illustration";
import SpeechBubble from "@/components/SpeechBubble";
import { MESSAGES } from "@/constants/messages";
import { cn } from "@/lib/utils";

export default function Home() {
  // Get messages from the server
  const messages = MESSAGES;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-yellow-100 relative overflow-hidden">
      {/* Fundo borrado suave */}
      <div className="absolute inset-0 backdrop-blur-3xl z-0" />

      {/* Container simulado de iPhone */}
      <div
        className={cn(
          "relative bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden z-10",
          "w-full max-w-[430px] aspect-[430/932]"
        )}
      >
        <main className="relative w-full h-full flex flex-col items-center justify-center text-center p-6">
          <SpeechBubble speed={60} text={messages.cinema_invitation} />

          {/* Conteúdo */}
          <div className="mt-64">
            <h1 className="text-2xl font-bold text-primary mb-2">Olá! Sou Dora, a Aventureira!</h1>
            <p className="text-base text-gray-800 mb-6">Vamos ao cinema? 🎬</p>
            <button className="bg-primary text-white px-6 py-2 rounded-full text-lg shadow-md hover:bg-primary transition">
              Ver Agenda
            </button>
          </div>

          {/* Ilustração */}
          <Illustration
            src="dora.png"
            width={180}
          />

        </main>
      </div>
    </div>
  );
}
