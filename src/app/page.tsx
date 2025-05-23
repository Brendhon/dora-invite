"use client";

import Button from "@/components/Button";
import { OtherDay } from "@/components/OtherDay";
import SelectDay from "@/components/SelectDay";
import { SelectMovie } from "@/components/SelectMovie";
import { SelectSession } from "@/components/SelectSession";
import { Summary } from "@/components/Summary";
import Welcome from "@/components/Welcome";
import { fetchMovies } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { MovieSession, Room } from "@/types/movie";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);

  // Estados para armazenar as escolhas
  const [otherDay, setOtherDay] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieSession | null>(null);
  const [selectedSession, setSelectedSession] = useState<string>('');

  // Dados dos filmes
  const [movies, setMovies] = useState<MovieSession[]>([]);

  useEffect(() => {
    fetchMovies().then(setMovies);
  }, []);

  // Obter os dias únicos de todos os filmes
  const allDays = Array.from(new Set(movies.flatMap(m => m.dates))).sort();

  // Funções para avançar e retroceder os passos
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => {
    setOtherDay(false);
    setStep(s => s - 1)
  };


  // Função para lidar com o clique 'Confirmar'
  const handleConfirm = () => {
    if (selectedDay && selectedMovie && selectedSession) {
      alert(`Você escolheu:\nDia: ${selectedDay}\nFilme: ${selectedMovie.title}\nSessão: ${selectedSession}`);
    }
  };

  // Selecionar dia
  const handleSelectDay = (day: string | null) => {
    setSelectedDay(day);
    nextStep();
    day ? setOtherDay(false) : setOtherDay(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-yellow-100 relative overflow-hidden">
      {/* Fundo borrado suave */}
      <div className="absolute inset-0 backdrop-blur-3xl z-0" />

      {/* Container simulado de iPhone */}
      <div
        className={cn(
          "relative bg-white shadow-xl border border-gray-200 overflow-hidden z-10",
          "w-full max-w-[430px] aspect-[430/932]",
          "rounded-none sm:rounded-3xl"
        )}
      >
        <main className="relative w-full h-full flex flex-col items-center justify-between text-center p-6">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Welcome onNext={nextStep} />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="select-day"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <SelectDay days={allDays} onSelectDay={handleSelectDay} />
              </motion.div>
            )}

            {otherDay && (
              <motion.div
                key="other-day"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <OtherDay />
              </motion.div>
            )}

            {step === 2 && selectedDay && (
              <motion.div
                key="select-movie"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <SelectMovie
                  movies={movies}
                  onSelect={(movie) => {
                    setSelectedMovie(movie);
                    nextStep();
                  }}
                />
              </motion.div>
            )}

            {step === 3 && selectedMovie && (
              <motion.div
                key="select-session"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <SelectSession
                  movie={selectedMovie}
                  onSelectSession={(session) => {
                    setSelectedSession(session);
                    nextStep();
                  }}
                />
              </motion.div>
            )}

            {step === 4 && selectedDay && selectedMovie && selectedSession && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Summary
                  day={selectedDay}
                  movieTitle={selectedMovie.title}
                  time={selectedSession}
                  room={
                    selectedMovie.rooms.find((room: Room) =>
                      room.sessions.includes(selectedSession)
                    )?.name || ""
                  }
                />
              </motion.div>
            )}

            <motion.div
              className="flex w-full justify-between p-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              {step >= 1 && (
                <Button onClick={prevStep} className="text-gray-500 bg-white border-2 border-gray-300 hover:bg-gray-100 transition">
                  Voltar
                </Button>
              )}

              {(step > 3 || otherDay) && (
                <Button onClick={handleConfirm} >
                  Confirmar
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

