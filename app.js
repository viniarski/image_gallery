// fetch images from unsplash with API

const form = document.getElementById("form");
const imagecontainer = document.getElementById("img_container");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(event);
  let query = event.target.input.value;
  search(query);
});

async function search(queryParam) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${queryParam}&client_id=ywoppbhOsnIKpTA0ekfrY_sjIkmImzjMj8TAj2o4jig`
  );
  console.log(response);
  let data = await response.json();
  
  if (data.results.length > 0) {
    imagecontainer.innerHTML = '';

    data.results.forEach((result) => {
      let img = document.createElement("img");
      img.src = result.urls.raw;
      imagecontainer.appendChild(img);
    });
}

}

// left and right nav buttons

// const buttonNext = 
// const buttonPrevious = 