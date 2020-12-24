import items from "./gallery-items.js";

const createItem = (item) => {
  const itemRef = document.createElement("li");
  itemRef.classList.add("gallery_item");

  const linkRef = document.createElement("a");
  linkRef.setAttribute("href", "${item.original}");
  linkRef.classList.add("gallery_link");
  linkRef.insertAdjacentHTML(
    "afterbegin",
    `<img class = "gallery__image" src = ${item.preview} data-source = ${item.original} alt = "${item.description}"/>`
  );
  itemRef.append(linkRef);
  return itemRef;
};

const mappedItems = items.map((item) => createItem(item));
const galleryRef = document.querySelector(".gallery");
galleryRef.append(...mappedItems);
galleryRef.addEventListener("click", openGalleryOnClick);

function openGalleryOnClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;

  backDropRef.classList.add("is-open");
  largeImageRef.src = largeImageURL;

  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeBackDrop();
    }

    if (event.code === "ArrowRight") {
      console.log("Прожимаем стрелку вправо");
    }
  });
}

function closeOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closeBackDrop();
  }
}
function closeBackDrop(event) {
  backDropRef.classList.remove("is-open");
  largeImageRef.src = "";
}

const backDropRef = document.querySelector(".lightbox");
const backDropOverlay = document.querySelector(".lightbox__overlay");
const closeBackDropRef = document.querySelector(".lightbox__button");
const largeImageRef = document.querySelector(".lightbox__image");

backDropOverlay.addEventListener("click", closeOnOverlay);
closeBackDropRef.addEventListener("click", closeBackDrop);
