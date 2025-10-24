const accessKey = "YOUR_UNSPLASH_ACCESS_KEY"; // 🔑 Replace with your Unsplash API key

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const showMoreBtn = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = input.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResults.appendChild(imageLink);
  });

  showMoreBtn.style.display = "block";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
