export interface MovieSession {
  title: string;
  genre: string[];
  ageRating: number;
  dates: string[]; // formato: "dd/mm/yyyy"
  rooms: Room[];
}

export interface Room {
  name: string;
  format: "2D" | "3D";
  language: "Dublado" | "Legendado";
  sessions: string[]; // formato: "hh:mm"
}
