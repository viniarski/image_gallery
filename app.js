// fetch images from unsplash with API

const form = document.getElementById("form");
const imageContainer = document.getElementById("img_container");

let gallery = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let query = event.target.input.value;
  search(query);
});

async function search(queryParam) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${queryParam}&client_id=ywoppbhOsnIKpTA0ekfrY_sjIkmImzjMj8TAj2o4jig`
  );
  let data = await response.json();

  if (data.results.length > 0) {
    gallery = data.results.slice(0, 10); // fetch 10 pictures
    showImage(currentIndex);
  }
}

function showImage(index) {
  imageContainer.innerHTML = `<img src="${gallery[index].urls.raw}" alt="Image">`;
}

// next and previous button, works in circle

const buttonNext = document.getElementById("next");
const buttonPrevious = document.getElementById("previous");

let currentIndex = 0;

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
