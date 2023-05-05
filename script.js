const img = document.querySelector("img");
const newImageButton = document.querySelector("#new-image-button");
const searchImageButton = document.querySelector("#search-image-button");
const searchInput = document.querySelector("#search-input");

const form = document.querySelector("form");

const allButtons = document.querySelectorAll("button");

allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      (button.innerText == "Search" && searchInput.value == "") ||
      searchInput.value == null
    )
      return;

    let previousText = button.innerText;
    button.innerText = "Loading...";
    setTimeout(() => {
      button.innerText = previousText;
    }, 3000);
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault(); // this line prevents the default form behavior
  // Your custom code goes here...
  changeSearchInputs();
});

let searchValue = "Kenya";
newImageButton.innerText = "New " + searchValue + " GIF Image";

getNewImage();

newImageButton.addEventListener("click", getNewImage);

searchImageButton.addEventListener("click", changeSearchInputs);

function getNewImage() {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=WXpAvdBjzbmpAFOxxxViPoa1GIrsVGRD&s=${searchValue}`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
    })
    .catch(function (error) {
      alert("OOPS!! ERROR, Cant find Image 😭");
      return;
    });
}

function changeSearchInputs() {
  if (searchInput.value == "" || searchInput.value == null) return;

  searchValue = searchInput.value;
  getNewImage();
  newImageButton.innerText = "New " + searchValue + " GIF Image";

  searchInput.value = "";
}
