/*
  REGOLE
  - Solo const/let, mai var.
  - DOM con querySelector / querySelectorAll.
  - Eventi con addEventListener (mai onclick inline nell'HTML).
*/

let usciti = []; // array dei numeri già estratti

/* SCRIVI QUI LE TUE FUNZIONI E I TUOI LISTENER:
   1. rendiTabellone()  — crea 90 div, evidenzia i numeri usciti
   2. estrai()          — pesca un numero casuale tra i non usciti
   3. rendiCronologia() — mostra gli ultimi 10 estratti
   4. Listener click su #estrai e #reset
   EXTRA: conteggio, animazione di estrazione, localStorage
*/

const tabellone = document.querySelector("#tabellone");
const ultimoNumero = document.querySelector("#ultimo-numero");
const cronologia = document.querySelector("#cronologia");
const estraiNumeri = document.querySelector("#estrai");
const resetTabellone = document.querySelector("#reset");

const rendiTabellone = () => {
  tabellone.innerHTML = "";

  for (let i = 1; i <= 90; i++) {
    const casella = document.createElement("div");
    casella.classList.add("numero");
    casella.innerText = i;

    if (usciti.includes(i)) {
      casella.classList.add("uscito");
    }

    tabellone.appendChild(casella);
  }
};

const rendiCronologia = () => {
  if (usciti.length === 0) {
    cronologia.innerText = "Nessun numero estratto.";
    return;
  }

  const ultimiEstratti = [...usciti].reverse().slice(0, 5);
  cronologia.innerText = ultimiEstratti.join(", ");
};

const estrai = () => {
  if (usciti.length >= 90) {
    alert("Tutti i 90 numeri sono stati estratti!");
    reset();
    return;
  }

  let numeroEstratto;

  do {
    numeroEstratto = Math.floor(Math.random() * 90) + 1;
  } while (usciti.includes(numeroEstratto));

  usciti.push(numeroEstratto);

  ultimoNumero.innerText = numeroEstratto;
  rendiTabellone();
  rendiCronologia();
};

const reset = () => {
  usciti = [];
  ultimoNumero.innerText = "—";
  rendiCronologia();
  rendiTabellone();
};

estraiNumeri.addEventListener("click", estrai);
resetTabellone.addEventListener("click", reset);

rendiTabellone();