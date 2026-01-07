// gallery.js

const images = [
  {
    id: "vulcan",
    src: "./src/assets/images/Bild-1.webp",
    alt: "Dunkler Vulkan bei Ausbruch mit aufsteigender schwarzer Rauchwolke, glühender Lava und zwei rot leuchtenden Öffnungen, die wie Augen wirken",
    title: "Der erwachende Vulkan",
  },
  {
    id: "earth",
    src: "./src/assets/images/Bild-2.webp",
    alt: "Luftaufnahme eines schmalen, glühend orangefarbenen Lavastroms, der sich wie ein Riss durch dunkles, erkaltetes Vulkangestein zieht",
    title: "Glühende Narbe der Erde",
  },
  {
    id: "cristal",
    src: "./src/assets/images/Bild-3.webp",
    alt: "Kleiner, intensiv blau leuchtender Kristall auf dunklem, körnigem Untergrund mit viel negativem Raum und minimalistischem Bildaufbau",
    title: "Blauer Kristall im Dunkel",
  },
  {
    id: "viewpoint",
    src: "./src/assets/images/Bild-4.webp",
    alt: "Person sitzt auf einem Felsen und blickt bei Sonnenuntergang über eine Berglandschaft mit Wolkenband und pastellfarbenem Himmel",
    title: "Stille über den Bergen",
  },
  {
    id: "stone",
    src: "./src/assets/images/Bild-5.webp",
    alt: "Luftaufnahme eines zerklüfteten Felsens im dunklen Ozean, umspült von weiß schäumenden Wellen und tiefblauem Wasser",
    title: "Fels im Atem des Meeres",
  },
  {
    id: "hunter",
    src: "./src/assets/images/Bild-6.webp",
    alt: "Illustration eines mythologischen Jägers als Sternbild am Nachthimmel, gezeichnet aus leuchtenden Sternpunkten und Linien vor dunklem Sternenhintergrund",
    title: "Das Sternbild des Jägers",
  },
  {
    id: "sea",
    src: "./images/Bild-7.webp",
    alt: "Luftaufnahme von weißen Meereswellen, die auf einen dunklen Strand treffen, mit starkem Kontrast zwischen schäumendem Wasser und schwarzem Sand",
    title: "Grenze zwischen Wasser und Nacht",
  },
  {
    id: "arrows",
    src: "./src/assets/images/Bild-8.webp",
    alt: "Abstraktes geometrisches Muster aus blauen und weißen Pfeilformen, die nach oben zeigen, mit klaren Linien und modernem Design",
    title: "Aufwärts gerichtet",
  },
  {
    id: "air",
    src: "./src/assets/images/Bild-9.webp",
    alt: "Abstrakte, weich geschwungene Formen in dunklen Grün- und Türkistönen mit fließenden Übergängen und ruhiger, organischer Anmutung",
    title: "Sanfte Strömung",
  },
  {
    id: "quiet",
    src: "./src/assets/images/Bild-10.webp",
    alt: "Weicher Farbverlauf von dunklem Blau zu hellem Türkis mit sanften Übergängen und ruhiger, abstrakter Wirkung",
    title: "Licht in Bewegung",
  },
  {
    id: "deep",
    src: "./src/assets/images/Bild-11.webp",
    alt: "Abstrakte, weich verlaufende Strukturen in Türkisgrün auf dunklem Hintergrund mit feinen, faserartigen Linien und ruhiger Bewegung",
    title: "Fließende Tiefe",
  },
  {
    id: "sunset",
    src: "./src/assets/images/Bild-12.webp",
    alt: "Luftaufnahme eines kleinen Inselortes mit Häusern, Straßen und Brücken, umgeben von Meer und Felsen, im warmen Licht der Abendsonne",
    title: "Inseln im goldenen Licht",
  },
];

// ------- helpers: DOM ready + wait for element (für nachgeladene Komponenten) -------

function domReady() {
  return new Promise((resolve) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", resolve, { once: true });
    } else {
      resolve();
    }
  });
}

function waitForElement(selector, { timeout = 5000 } = {}) {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);

    const obs = new MutationObserver(() => {
      const found = document.querySelector(selector);
      if (found) {
        obs.disconnect();
        resolve(found);
      }
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });

    if (timeout) {
      setTimeout(() => {
        obs.disconnect();
        reject(new Error(`Element not found: ${selector}`));
      }, timeout);
    }
  });
}

// ------- Gallery / Lightbox -------

async function initGallery() {
  await domReady();

  // Warten bis die HTML-Komponenten wirklich drin sind
  const imgList = await waitForElement("*[data-img-list]");
  const dialog = await waitForElement("#lightbox");

  const dialogClose = await waitForElement("#closeDialogBtn");
  const dialogImg = await waitForElement("#dialogImg");
  const currentImg = await waitForElement("#currentImg");
  const nextBtn = await waitForElement("#nextBtn");
  const previousBtn = await waitForElement("#previousBtn");
  const currentHeadText = await waitForElement("#imageName");

  let currentImgIndex = 0;

  function updateImg(index) {
    dialogImg.setAttribute("src", images[index].src);
    dialogImg.setAttribute("alt", images[index].alt);

    currentImgIndex = index;
    currentImg.textContent = `${index + 1} / ${images.length}`;
    currentHeadText.textContent = images[index].title || images[index].id;
  }

  function nextImage() {
    let nextIndex = currentImgIndex + 1;
    if (nextIndex === images.length) nextIndex = 0;
    updateImg(nextIndex);
  }

  function previousImage() {
    let previousIndex = currentImgIndex - 1;
    if (previousIndex < 0) previousIndex = images.length - 1;
    updateImg(previousIndex);
  }

  function openDialog(index) {
    updateImg(index);
    dialog.showModal();
  }

  function closeDialog() {
    dialog.close();
  }

  function renderListItemHTML(image) {
    return `
      <li>
        <img
          src="${image.src}"
          alt="${image.alt}"
          data-itemImage
          class="itemImage"
          aria-label="Bild in großer Darstellung anzeigen"
          loading="lazy"
        >
      </li>
    `;
  }

  function createImagesList() {
    imgList.innerHTML = images.map(renderListItemHTML).join("");

    const itemImg = imgList.querySelectorAll("*[data-itemImage]");
    itemImg.forEach((img, index) => {
      img.addEventListener("click", () => openDialog(index));
      img.tabIndex = 0;

      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDialog(index);
        }
      });
    });
  }

  // render
  createImagesList();

  // Buttons
  nextBtn.addEventListener("click", nextImage);
  previousBtn.addEventListener("click", previousImage);
  dialogClose.addEventListener("click", closeDialog);

  // Click outside to close
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  // Keyboard inside dialog
  dialog.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        previousImage();
        break;
      case "ArrowRight":
        event.preventDefault();
        nextImage();
        break;
      case "Escape":
        closeDialog();
        break;
    }
  });
}

// starten
initGallery().catch((err) => {
  console.error("[Gallery] init failed:", err);
});
