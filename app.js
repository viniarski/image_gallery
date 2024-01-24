// variables

const imageContainer = document.getElementById("img_container");
const imageGallery = document.getElementById("slider_container");

let gallery = [];
let currentIndex = 0;

// fetch pictures from unsplash using API

async function search(queryParam) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?page=1&orientation=landscape&query=${queryParam}&client_id=ywoppbhOsnIKpTA0ekfrY_sjIkmImzjMj8TAj2o4jig`
  );
  let data = await response.json();

  if (data.results.length > 0) {
    gallery = data.results.slice(0, 10);
    showImage(currentIndex);
  }
}

// display main image

function showImage(index) {
  const imageUrl = gallery[index].urls.regular; // regular image size
  const altText = gallery[index].alt_description; // image description

  imageContainer.innerHTML = `<img src="${imageUrl}" alt="${altText}">`;
}

// random image for loading page

document.addEventListener("DOMContentLoaded", function () {
  const randomQuery = generateRandomQuery();
  search(randomQuery);
  showTopGallery();
});

function generateRandomQuery() {
  const keywords = [
    "china",
    "new york",
    "portugal",
    "forest",
    "landscape",
    "mountains",
    "city",
    "lakes",
    "architecture",
    "animals",
  ];
  const randomIndex = Math.floor(Math.random() * keywords.length);
  return keywords[randomIndex];
}

// display top gallery

// function showTopGallery() {
//   imageGallery.innerHTML = "";

//   for (let i = 0; i < gallery.length; i++) {
//     const imageUrl = gallery[i].urls.thumb;
//     const altText = gallery[i].alt_description;

//     const imgElement = document.createElement("img");
//     imgElement.src = imageUrl;
//     imgElement.alt = altText;

//     imgElement.addEventListener("click", function () {
//       currentIndex = i;
//       showImage(currentIndex);
//     });

//     imageGallery.appendChild(imgElement);
//   }
// }

// search form

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let query = event.target.input.value;
  search(query);
});

// next and previous button, mouse click
// works in circle

const buttonNext = document.getElementById("next");
const buttonPrevious = document.getElementById("previous");

buttonNext.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex >= gallery.length) {
    currentIndex -= gallery.length;
  }
  showImage(currentIndex);
});

buttonPrevious.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex += gallery.length;
  }
  showImage(currentIndex);
});

// next and previous button, for the left arrow key
// works in circle

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    currentIndex++;
    if (currentIndex >= gallery.length) {
      currentIndex -= gallery.length;
    }
    showImage(currentIndex);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex += gallery.length;
    }
    showImage(currentIndex);
  }
});
