// TASK:

// 1) Capire quante celle generare per il mese corrente (dovrà funzionare per OGNI mese, non solo quello attuale)

// 2) Con il numero esatto trovato, dovremo generare il numero corrispondente di celle nel calendario

// 3) Il giorno corrente dovrebbe "illuminarsi"

// 4) Visualizzare il nome del mese corrente dentro all'h1

// 5) Rendere cliccabili le singole celle applicando la classe .selected che ne attiverà il bordo (questa operazione renderà anche possibile il salvataggio di appuntamenti )

// ______________________________________________________ Contestualmente al punto 5 ______________________________________

// 6) Modificare il meeting day alla selezione di un giorno

// ________________________________________________________________________________________________________________________

// 7) Creazione di array con lo stesso numero di sotto array ("cassetti") dei giorni del calendario

// _______________________________________________________ Al click del bottone submit ____________________________________

// 8) Devo poter salvare un appuntamento, prendendo i valori dei due input (data/ora, testo meeting), nel "cassetto" del giorno corrispondente

// 9) Dobbiamo visualizzare il nuovo appuntamento nella lista sottostante (che va resa visibile)

// ________________________________________________________________________________________________________________________

// 10) Si deve poter selezionare altri giorni, potendo inserire nuovi appuntamenti per loro,
//     pur mantenendo la possibilità di RIVEDERE gli appuntamenti già salvati in altri giorni

// EXTRA 11) Un giorno contenente un appuntamento dovrà riflettere questo stato con un pallino colorato all'interno della cella
// <span class="dot"></span>

// 7) creo un array di appuntamenti (vuoto per il momento)
// verrà riempito nel for loop di createDays
const appointments = [];
/* 
    [
        [],[],[],[],[],[],[],
        [],[],[],[],[],[],[],
        [],[],[],[],[],[],[],
        [],[],[],[],[],[],[],
        [],[],[]
    ]
 */

// 1) quanti giorni ha questo mese
const now = new Date(); // torna un oggetto di tipo Date

const daysInThisMonth = () => {
  const getYear = now.getFullYear(); // 2024
  const getMonth = now.getMonth(); // 7 per agosto (al momento della stesura di questo codice)

  //   new Date (anno attuale, mese attuale + 1, giorno zero (ultimo giorno mese precedente))
  const lastDayDate = new Date(getYear, getMonth + 1, 0); // OGGETTO DATA dell'ultimo giorno del mese corrente
  //
  const lastDayOfThisMonth = lastDayDate.getDate(); // 31 per agosto - il NUMERO dell'ultimo giorno

  return lastDayOfThisMonth;

  // si può riassumere in questa forma:
  // return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
};

// deseleziona eventuali altri .day selezionati
const unselectPreviousDay = () => {
  const previouslySelected = document.querySelector(".day.selected");
  if (previouslySelected) {
    // se finiamo qui, verosimilmente dal secondo click in poi, rimuoveremo la classe all'elemento trovato
    previouslySelected.classList.remove("selected");
  }
};

// cambia numero in #newMeetingDay
const changeMeetingDay = dayNumber => {
  // dayNumber è l'indice che arriva dal for loop (vedi esecuzione della funzione in basso)
  const dayNumberSpan = document.getElementById("newMeetingDay");
  dayNumberSpan.classList.add("hasDay");
  dayNumberSpan.innerText = dayNumber;
};

// 2) genero il giusto numero di giorni
const createDays = days => {
  const calendar = document.getElementById("calendar");
  for (let i = 0; i < days; i++) {
    // 7) generiamo le posizioni ("cassetti") nell'array globale appointments
    appointments.push([]);
    // ____________________

    // generiamo le nostre celle per ogni giorno...
    const dayCellDiv = document.createElement("div"); // creo un nuovo div vuoto
    dayCellDiv.className = "day"; // gli assegno la classe che dovrà avere, si poteva fare anche con un .classList.add("day")

    const dayCellH3 = document.createElement("h3"); // creo un h3 vuoto
    dayCellH3.innerText = i + 1; // aggiungo il numero del giorno in base 1

    // 5) rendiamo cliccabili le celle
    // su OGNI cella del calendario agganciamo una funzione (eventListener), per tutti specifica e un po' diversa nel contenuto
    // la funzione si eseguirà SOLO SE l'utente cliccherà una cella
    dayCellDiv.onclick = function (e) {
      // 5b) gestire la selezione della cella:
      // controlliamo l'esistenza di un elemento precedentemente selezionato, in quel caso lo deselezioniamo...
      unselectPreviousDay();
      // ...prima di aggiungere la classe all'elemento appena cliccato
      dayCellDiv.classList.add("selected");

      // 6) cambiare il meeting day con il numero dell'elemento cliccato
      changeMeetingDay(i + 1);

      // 10) chiedo a JS se ci sono appuntamenti per questo giorno cliccato
      // per ogni click di una cella del calendario controlla se ci sono appuntamenti nello spazio corrispondente all'array appointments
      if (appointments[i].length > 0) {
        // se ci sono, si eseguirà la funzione per gestire la visualizzazione degli appuntamenti, le verrà passato l'indice dell'elemento cliccato
        showAppointments(i);
      } else {
        // in caso contrario, se l'array del giorno è ancora vuoto, si nasconderà la sezione appointments
        const appointmentsContainer = document.getElementById("appointments");
        appointmentsContainer.style.display = "none";
      }

      console.log("x", e.offsetX, "y", e.offsetY);
    };

    // 3) scopro qual è il giorno da colorare tra tutti quelli generati in questo loop

    // verifichiamo l'effetivo numero del giorno di oggi, a partire dalla data precedentemente estratta (vedi sopra)
    const today = now.getDate(); // 29 alla data della stesura di questo codice

    if (i + 1 === today) {
      // i + 1 sarà 29

      // confrontiamo il numero del ciclo +1 con il numero del giorno,
      // se corrispondono vogliamo colorare la cella che viene creata in questo ciclo, prima che venga inserita nel DOM
      dayCellH3.classList.add("color-epic");
    }

    // inseriamo il singolo h3 e la singola cella creata in ogni loop
    dayCellDiv.appendChild(dayCellH3);
    calendar.appendChild(dayCellDiv);
  }

  console.log("APPOINTMENTS", appointments);
};

const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

// 4) inserisco il nome del mese nell'h1
const printCurrentMonthInH1 = () => {
  const h1 = document.querySelector("h1");
  const monthIndex = now.getMonth(); // 7 per agosto
  const monthName = monthNames[monthIndex]; // "Agosto"

  h1.innerText = monthName; // modifico il testo dell'h1
};

// 9) funzione per gestire la visualizzazione dei miei appuntamenti
const showAppointments = index => {
  // questa funzione si occuperà di prelevare gli appuntamenti (stringhe) dalla cella dell'array corrispondente tramite parametro index
  const todaysAppointments = appointments[index]; // array del giorno selezionato

  // elemento <ul> già presente nella pagina che aspetta gli elementi della lista da visualizzare
  const ulForAppointments = document.getElementById("appointmentsList");
  ulForAppointments.innerHTML = ""; // svuotiamo la lista ad ogni esecuzione della funzione (per evitare di vedere dati vecchi duplicati)

  // l'array del giorno viene ciclato e se contiene stringhe creerà per ogni stringa un <li> che si andrà ad inserire nella <ul>
  todaysAppointments.forEach(appointmentStr => {
    const li = document.createElement("li");
    li.innerText = appointmentStr;

    ulForAppointments.appendChild(li);
  });

  // la sezione è nascosta di default dal CSS, andiamo a cambiargli la proprietà display per visualizzarla
  const appointmentsContainer = document.getElementById("appointments");
  appointmentsContainer.style.display = "block";
};

// 8b) prendo i valori dagli input e creo un nuovo appuntamento che salverò nell'array appointments nella posizione corrispondente al giorno
const saveMeeting = e => {
  e.preventDefault(); // OBBLIGATORIO Quando la funzione è associata al submit di un form!

  // se siamo qui il bottone save meeting è stato cliccato e i dati sono sicuramente contenuti nei due input (altrimenti la funzione non parte)
  const meetingTime = document.getElementById("newMeetingTime");
  const meetingName = document.getElementById("newMeetingName");

  // creeiamo la stringa di appuntamento
  const meetingString = meetingTime.value + " — " + meetingName.value;

  // stringa col numero del giorno (se precedentemente cliccato)
  const selectedDay = document.getElementById("newMeetingDay").innerText;

  //  controlliamo che sia selezionato un giorno prima di provare a pushare nel sotto array di appointments
  if (selectedDay !== "Click on a Day") {
    const dayIndex = parseInt(selectedDay) - 1; // torniamo in base 0 per usare dayIndex come indice da selezionare su appointments

    appointments[dayIndex].push(meetingString); // inseriamo la stringa nell'array del giorno selezionato (il nostro "cassetto")

    // resettiamo i campi input per accettare futuri valori
    meetingTime.value = "";
    meetingName.value = "";

    // EXTRA 11) - aggiungiamo 1 SOLA VOLTA il pallino nella cella che indicherà la presenza di appuntamenti
    if (appointments[dayIndex].length === 1) {
      const selectedCell = document.querySelector(".day.selected"); // selezioniamo il nodo della cella interessata
      const dot = document.createElement("span"); // creo span
      dot.classList.add("dot"); // aggiungo classe dot (precedentemente stilizzata in CSS)
      selectedCell.appendChild(dot); // inserisco dot nella cella selezionata
    }

    // 9) visualizziamo l'appuntamento appena creato nella lista sottostante
    showAppointments(dayIndex);
  } else {
    alert("Devi prima cliccare su una cella del calendario");
  }
};

// 👇👇👇 punto di ingresso del nostro codice - la creazione della nostra applicazione inizia qui
window.onload = () => {
  // tutte le risorse sono a questo punto già caricate nel browser
  // è il momento più sicuro per cominciare a cercare gli elementi nel DOM

  printCurrentMonthInH1(); // applichiamo la stringa del mese corrente nell'h1

  const numberOfDays = daysInThisMonth(); // 31

  createDays(numberOfDays); // createDays(31)

  // 8a) al form si aggancia la funzione saveMeeting all'evento submit (scatenato dal click sul bottone save meeting)
  const form = document.querySelector("form");
  form.onsubmit = saveMeeting;
};
