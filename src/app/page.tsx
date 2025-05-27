"use client";

import Button from "@/components/Button";
import { Error } from "@/components/Error";
import { OtherDay } from "@/components/OtherDay";
import SelectDay from "@/components/SelectDay";
import { SelectMovie } from "@/components/SelectMovie";
import { SelectSession } from "@/components/SelectSession";
import { Spinner } from "@/components/spinner";
import { StepWrapper } from "@/components/StepWrapper";
import { Summary } from "@/components/Summary";
import Welcome from "@/components/Welcome";
import { MESSAGES } from "@/constants/messages";
import { fetchMovies } from "@/lib/movies";
import { cn, getWeekday } from "@/lib/utils";
import { MovieSession, Room } from "@/types/movie";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [canInteract, setCanInteract] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // States to store user choices
  const [otherDay, setOtherDay] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieSession | null>(null);
  const [selectedSession, setSelectedSession] = useState<string>('');

  // Movie data
  const [movies, setMovies] = useState<MovieSession[]>([]);

  useEffect(() => {
    fetchMovies()
      .then((data) => {
        setMovies(data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Get unique days from all movies
  const allDays = Array.from(new Set(movies.flatMap(m => m.dates))).sort();

  // Functions to go to the next and previous steps
  const nextStep = () => {
    setCanInteract(false);
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setCanInteract(false);
    setOtherDay(false);
    setStep((s) => s - 1);
  };

  const handleConfirm = () => {
    let message = MESSAGES.other_day_confirmation;

    if (selectedDay && selectedMovie && selectedSession) {
      message = MESSAGES.confirmation
        .replace("{day}", getWeekday(selectedDay))
        .replace("{movie}", selectedMovie.title)
        .replace("{time}", selectedSession);
    }

    const phone = "5535997164703";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Select day
  const handleSelectDay = (day: string | null) => {
    setSelectedDay(day);
    nextStep();
    day ? setOtherDay(false) : setOtherDay(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#a18cd1] via-[#fbc2eb] to-[#fad0c4] relative overflow-hidden flex justify-center">
      <div className="absolute inset-0 backdrop-blur-3xl z-0" />
      <div
        className={cn(
          "relative bg-white shadow-xl border border-gray-200 overflow-hidden z-10",
          "w-full max-w-[400px] m-6",
          "rounded-3xl"
        )}
      >
        <main className="relative w-full h-full flex flex-col items-center justify-between text-center p-6 overflow-y-auto scrollbar-hidden overflow-x-hidden">
          {loading && (
            <StepWrapper key="loading" stepKey="loading" className="m-auto flex items-center justify-center">
              <Spinner className="w-[60px] h-[60px] text-primary animate-spin" />
            </StepWrapper>
          )}
          {error && !loading && (
            <StepWrapper key="error" stepKey="error">
              <Error onComplete={() => setCanInteract(true)} />
            </StepWrapper>
          )}
          {!error && !loading && <AnimatePresence mode="wait">
            {step === 0 && (
              <StepWrapper key="welcome" stepKey="welcome">
                <Welcome onNext={nextStep} onComplete={() => setCanInteract(true)} />
              </StepWrapper>
            )}

            {step === 1 && (
              <StepWrapper key="select-day" stepKey="select-day">
                <SelectDay
                  days={allDays}
                  onSelectDay={handleSelectDay}
                  onComplete={() => setCanInteract(true)}
                />
              </StepWrapper>
            )}

            {otherDay && (
              <StepWrapper key="other-day" stepKey="other-day">
                <OtherDay onComplete={() => setCanInteract(true)} />
              </StepWrapper>
            )}

            {step === 2 && selectedDay && (
              <StepWrapper key="select-movie" stepKey="select-movie">
                <SelectMovie
                  movies={movies}
                  onSelect={(movie) => {
                    setSelectedMovie(movie);
                    nextStep();
                  }}
                  onComplete={() => setCanInteract(true)}
                />
              </StepWrapper>
            )}

            {step === 3 && selectedMovie && (
              <StepWrapper key="select-session" stepKey="select-session">
                <SelectSession
                  movie={selectedMovie}
                  onSelect={(session) => {
                    setSelectedSession(session);
                    nextStep();
                  }}
                  onComplete={() => setCanInteract(true)}
                />
              </StepWrapper>
            )}

            {step === 4 && selectedDay && selectedMovie && selectedSession && (
              <StepWrapper key="summary" stepKey="summary">
                <Summary
                  day={selectedDay}
                  movieTitle={selectedMovie.title}
                  time={selectedSession}
                  onComplete={() => setCanInteract(true)}
                  room={
                    selectedMovie.rooms.find((room: Room) =>
                      room.sessions.includes(selectedSession)
                    )?.name || ""
                  }
                />
              </StepWrapper>
            )}
            {canInteract &&
              <StepWrapper
                key="footer"
                stepKey="footer"
                className="flex w-full justify-between mt-6"
              >
                {step >= 1 && (
                  <Button onClick={prevStep} className="text-gray-500 bg-white border-2 border-gray-300 hover:bg-gray-100 transition">
                    🔙 Voltar
                  </Button>
                )}

                {(step > 3 || otherDay) && (
                  <Button onClick={handleConfirm} >
                    🎉 Sim, vamos lá!
                  </Button>
                )}
              </StepWrapper>
            }
          </AnimatePresence>
          }
        </main>
      </div>
    </div>
  );
}