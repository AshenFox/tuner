let dial = document.querySelector(".dial");

console.log(dial);

/* let notchHtmlString =  `<div class="notch-container n1">
<div class="notch"></div>
</div>` */

const fillDial = () => {
  for (let i = 0; i < 120; i++) {
    let newNotch = document.createElement("div");
    newNotch.classList.add("notch-container");
    newNotch.style.transform = `rotate(${i * 3}deg)`;
    newNotch.innerHTML = '<div class="notch"></div>';

    dial.append(newNotch);

    if (i < 15) {
      let newFr = document.createElement("div");
      newFr.classList.add("fr-container");
      newFr.style.transform = `rotate(${i * 24}deg)`;
      newFr.innerHTML = '<span class="fr">100Hz</span>';

      dial.append(newFr);
    }

    if (i < 15) {
      let newNote = document.createElement("div");
      newNote.classList.add("note-container");
      newNote.style.transform = `rotate(${i * 45}deg)`;
      newNote.innerHTML = '<div class="note">E</div>';

      dial.append(newNote);
    }
  }
};

fillDial();

let angle = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    angle += 0.5;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    angle -= 0.5;
  }

  /* console.log(angle) */

  dial.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

  if (e.key === "c") {
    e.preventDefault();
    dial.innerHTML = "";
  }

  if (e.key === "a") {
    e.preventDefault();
    fillDial();
  }
});

let cleanedUp = false;
