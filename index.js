const getPostBtn = document.getElementById("getPost");
const outputRes = document.querySelector(".posts");
const loadingScreen = document.querySelector(".loading");

let url = "https://jsonplaceholder.typicode.com/posts";

function loadingElements() {
  loadingScreen.hidden = false;
  outputRes.innerHTML = "";
}
function stylingElems(title, description) {
  let postTitle = document.createElement("h3");
  let postDescription = document.createElement("h4");
  const ArrEl = document.createElement("div");
  postTitle.innerText = title;
  postDescription.innerText = description;
  postTitle.classList.add("posts__block--title");
  postDescription.classList.add("posts__block--description");
  ArrEl.append(postTitle, postDescription);
  ArrEl.classList.add("posts__block");
  outputRes.append(ArrEl);
}

function renderRes(arr) {
  getPostBtn.disabled = true;
  setTimeout(() => {
    getPostBtn.disabled = false;

    arr.forEach((element) => {
      stylingElems(element.title, element.body);
    });
    loadingScreen.hidden = true;
  }, 2000);
}

function renderError() {
  outputRes.innerHTML = "Ошибка при получении данных";
  getPostBtn.disabled = false;
}

function renderFinally() {}
getPostBtn.addEventListener("click", getPostFromBack);

function getPostFromBack() {
  loadingElements();
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then(renderRes)
    .catch(renderError)
    .finally(renderFinally);
}
