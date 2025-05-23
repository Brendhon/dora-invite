"use client";

import Illustration from "@/components/Illustration";
import SelectDay from "@/components/SelectDay";
import SpeechBubble from "@/components/SpeechBubble";
import Welcome from "@/components/Welcome";
import { MESSAGES } from "@/constants/messages";
import { fetchMovies } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { MovieSession, Room } from "@/types/movie";
import { useEffect, useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);

  // Estados para armazenar as escolhas
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieSession | null>(null);
  const [selectedSession, setSelectedSession] = useState<{ room: Room; time: string } | null>(null);

  // Dados dos filmes
  const [movies, setMovies] = useState<MovieSession[]>([]);

  useEffect(() => {
    fetchMovies().then(setMovies);
  }, []);

  // Obter os dias únicos de todos os filmes
  const allDays = Array.from(new Set(movies.flatMap(m => m.dates))).sort();

  // Funções para avançar e retroceder os passos
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);


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
          {step === 0 && (
            <Welcome
              onNext={nextStep}
            />
          )}

          {step === 1 && (
            <SelectDay
              days={allDays}
              onSelectDay={day => {
                setSelectedDay(day);
                nextStep();
              }}
              onBack={prevStep}
            />
          )}

          {/* {step === 2 && selectedDay && (
        <SelectMovie
          movies={movies}
          day={selectedDay}
          selectedMovie={selectedMovie}
          onSelectMovie={movie => {
            setSelectedMovie(movie);
            nextStep();
          }}
          onBack={prevStep}
        />
      )}

      {step === 3 && selectedMovie && (
        <SelectSession
          movie={selectedMovie}
          day={selectedDay!}
          selectedSession={selectedSession}
          onSelectSession={session => {
            setSelectedSession(session);
            nextStep();
          }}
          onBack={prevStep}
        />
      )}

      {step === 4 && selectedDay && selectedMovie && selectedSession && (
        <Summary
          day={selectedDay}
          movie={selectedMovie}
          session={selectedSession}
          onConfirm={() => alert("Vamos ao cinema! 🎬")}
          onBack={prevStep}
        />
      )} */}

        </main>
      </div>
    </div>
  );
}

