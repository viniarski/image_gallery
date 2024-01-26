// variables

let imageContainer = document.getElementById("img_container");
let galleryContainer = document.getElementById("gallery_container");

let gallery = [];
let currentIndex = 0;

// display main image with regular size to improve loading speed (can change to raw to get better quality pictures)
// fetched alt_description from json

function showImage(index) {
  const imageUrl = gallery[index].urls.regular;
  const altText = gallery[index].alt_description;

  imageContainer.innerHTML = `<img src="${imageUrl}" alt="${altText}">`;
}

// display top gallery and change picture when clicked

const createGallery = (gallery) => {
  galleryContainer.innerHTML = '';

  gallery.forEach((image, index) => {
    let imgElement = document.createElement('img');
    imgElement.src = image.urls.thumb;
    imgElement.alt = image.alt_description;

    imgElement.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
    });

    galleryContainer.appendChild(imgElement);
  });
};

// hide_open button

const hide_open = document.getElementById("hide_open");
let galleryOpen = true;

hide_open.addEventListener("click", function () {
  if (galleryOpen) {
    galleryContainer.style.display = "none";
  } else {
    galleryContainer.style.display = "flex";
  }
  galleryOpen = !galleryOpen;
});

// fetch pictures from unsplash using API

async function search(queryParam) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?page=1&orientation=landscape&query=${queryParam}&client_id=ywoppbhOsnIKpTA0ekfrY_sjIkmImzjMj8TAj2o4jig`
  );
  let data = await response.json();

  if (data.results.length > 0) {
    gallery = data.results;
    showImage(currentIndex);
    createGallery(gallery);
  }
}

// search form

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let query = event.target.input.value;
  search(query);
});

// random image for loading page
// bunch of keywords so the first image is generated randomly from an array

document.addEventListener("DOMContentLoaded", function () {
  const randomImg = randomImage();
  search(randomImg);
});

function randomImage() {
  const keywords = [
    "cracow",
    "poland",
    "warsaw",
    "norwich",
    "new york",
    "space",
    "forest",
    "landscape",
    "mountains",
    "city",
    "lakes",
    "architecture",
    "animals",
    "dolphin",
    "paris",
    "london",
    "china",
  ];
  const randomIndex = Math.floor(Math.random() * keywords.length);
  return keywords[randomIndex];
}

// variables and functions for next / previous button
// works in circle - if it goes to the last image it starts from the begining

const buttonNext = document.getElementById("next");
const buttonPrevious = document.getElementById("previous");

function circleLeft() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex += gallery.length;
  }
  showImage(currentIndex);
}

function circleRight() {
  currentIndex++;
  if (currentIndex >= gallery.length) {
    currentIndex -= gallery.length;
  }
  showImage(currentIndex);
}

// next and previous button, mouse click

buttonNext.addEventListener("click", function () {
  circleRight();
});

buttonPrevious.addEventListener("click", function () {
  circleLeft();
});

// next and previous button, for left and right arrow key

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    circleLeft();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    circleLeft();
  }
});

