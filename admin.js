import { db } from "./firebase.js";
import { ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const roomRef = ref(db, "room");
const winnerText = document.getElementById("winner");

onValue(roomRef, snapshot => {
  const data = snapshot.val();
  if (!data) return;

  winnerText.innerText = data.winner
    ? `🎉 ${data.winner}`
    : "Esperando...";
});

window.resetGame = () => {
  set(roomRef, {
    active: true,
    winner: null,
    time: null
  });
};
