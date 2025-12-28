import { db } from "./firebase.js";
import { ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let playerName = "";
const roomRef = ref(db, "room");

window.join = () => {
  playerName = document.getElementById("nameInput").value.trim();
  if (!playerName) return alert("Pon tu nombre, crack");

  document.getElementById("login").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
};

window.buzz = async () => {
  const snapshot = await get(roomRef);
  const data = snapshot.val();

  if (!data.active) return;

  set(roomRef, {
    active: false,
    winner: playerName,
    time: Date.now()
  });
};

onValue(roomRef, snapshot => {
  const data = snapshot.val();
  const btn = document.getElementById("buzzer");
  const status = document.getElementById("status");

  if (!data) return;

  if (data.active) {
    btn.disabled = false;
    status.innerText = "¡CORRE!";
  } else {
    btn.disabled = true;
    status.innerText = data.winner
      ? `Ganó ${data.winner}`
      : "Bloqueado";
  }
});
