export const MESSAGES = {
  greeting: "¡Hola! <strong>Sou Dora, a Aventureira!</strong> 👋",
  
  cinema_invitation: "Vamos escolher um dia para o cinema 🎬?",

  choose_day: "Para qual dia você quer ir ao cinema? <br/>Sábado? Domingo? Vamos olhar a agenda! 🗓️",

  choose_time: "Muito bem! Agora, qual horário é melhor?<br/>Tem sessão de manhã, à tarde… e até à noite! 🕒",

  map_song: "Vamos ver se o Mapa pode ajudar!<br/>🎵 Mapa, mapa, mapa! 🎵",

  map_response: "Ahá! O cinema fica bem pertinho!<br/>Só precisamos do ingresso e pipoca! 🍿",

  summary_intro: "Você escolheu:",

  // Os valores abaixo devem ser formatados com template literals na renderização
  summary_selection: (day: string, time: string) =>
    `Dia: <strong>${day}</strong><br/>Sessão: <strong>${time}</strong>`,

  final_message: "Estou tão animada!<br/>Vejo você no cinema! Vamos nos divertir muuuito! 🎉",

  thank_you: "Obrigada por me ajudar, Aventureiro(a)!<br/>Até logo!<br/>Beijos da Dora 💜"
};
