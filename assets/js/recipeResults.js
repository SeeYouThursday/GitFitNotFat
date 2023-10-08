//////////////////////// Selectors ////////////////////////
const recipeInputForm = document.getElementById("recipeSearch");
const recipeContainer = document.getElementById("recipe-container");
const goBackBtn = document.getElementById("goBack");
const confirmRecipeBtn = document.getElementById("confirm-recipe");

///////Empty Variables for later use ////////////////////////
let dataResults = "";
let recipeQuery = "";
let recipeImage = "";
let selectedRecipe = [];

const spoonacularKey = "5661b30edf15496e914efae71e0a25fc";
//////////////////////// Rendering ////////////////////////

const createCards =
  // below adjusting both s and m will size the whole card
  '<div class="col s12 m6 l3">' +
  '<div class="card hoverable flex">' +
  '<div class="card-image">' +
  '<img class="insert-img responsive-img" src="" alt="">' +
  '<h6 class="card-title amber-text text-darken-4 amber lighten-5">Card Title</h6>' +
  '<button class="btn-floating halfway-fab waves-effect waves-light red after-selection"><i class="material-icons add-recipe">add</i></button>' +
  "</div>" +
  '<div class="card-content">' +
  '<p class="caloriesPerServing">I am a very simple card. </p>' +
  "</div>" +
  '<div class="card-action">' +
  '<a href="#"  class="more-info">This is a link</a>' +
  "</div>" +
  "</div>" +
  "</div>";

function clearRecipeCards() {
  recipeContainer.replaceChildren("");
}

function renderRecipeSelection(data) {
  clearRecipeCards();
  recipeContainer.insertAdjacentHTML("beforeend", createCards);
  const recipeImgEl = document.querySelector(".insert-img");
  const moreInfoRecipeEl = document.querySelector(".more-info");
  const cardTitleEl = document.querySelector(".card-title");
  const removeRecipeBtn = document.querySelector(".after-selection");
  removeRecipeBtn.remove();
  // removes the red btn from the image // might not need if rerendered into horizontal card
  recipeImage = selectedRecipe[0].image;
  cardTitleEl.textContent = selectedRecipe[0].title;
  recipeImgEl.setAttribute("src", recipeImage);
  moreInfoRecipeEl.textContent = "More Info";
  moreInfoRecipeEl.setAttribute("href", selectedRecipe[0].sourceUrl);
}
// Left off here 1009pm 10.5
function renderSelectRecipeInstructions(data) {
  // once selection is made via the EvLi in RRPCard,
  // add confirm button and go back btn
  const resultsContainer = document.getElementById("results-container");
  const navigationBtns = document.getElementById("navigationBtns");
  navigationBtns.classList.remove("hide");
  resultsContainer.classList.remove("hide");
  // if confirm, move to the workout page,
  // if go back, call rRRPCards
}

function renderSelectionNutrients(data) {
  const servings = document.getElementById("servings");
  const calories = document.getElementById("calories");
  const carbs = document.getElementById("carbs");
  const protein = document.getElementById("protein");
  const fat = document.getElementById("fat");
  const nutritents = selectedRecipe[0].nutrition.nutrients;
  servings.textContent = "Servings: " + selectedRecipe[0].servings;
  calories.textContent = "Calories: " + nutritents[0].amount;
  carbs.textContent = "Carbs: " + nutritents[3].amount;
  protein.textContent = "Protein: " + nutritents[8].amount;
  fat.textContent = "Fat: " + nutritents[1].amount;
}

function renderRecipePictureCard(data) {
  // below function is to make sure that Materialize will apply its style to the newly created elements in the 'for' loop
  M.AutoInit();
  for (var i = 0; i < dataResults.length; i++) {
    recipeContainer.insertAdjacentHTML("beforeend", createCards);
    recipeImage = dataResults[i].image;
    const recipeImgEl = document.querySelectorAll(".insert-img");
    const moreInfoRecipeEl = document.querySelectorAll(".more-info");
    const cardTitleEl = document.querySelectorAll(".card-title");
    const recipeBtns = document.querySelectorAll(".add-recipe");
    const caloriePreview = document.querySelectorAll(".caloriesPerServing");
    // const recipeSummary = document.querySelectorAll(".recipe-summary");
    const recipeTitle = dataResults[i].title;
    cardTitleEl[i].textContent = recipeTitle;
    recipeImgEl[i].setAttribute("src", recipeImage);
    recipeImgEl[i].setAttribute("alt", recipeTitle);
    moreInfoRecipeEl[i].textContent = "Recipe Link";
    moreInfoRecipeEl[i].setAttribute("href", data.results[0].sourceUrl);
    recipeBtns[i].setAttribute("data-recipe", i);
    caloriePreview[i].textContent =
      "Calories per Serving: " + dataResults[i].nutrition.nutrients[0].amount;
    // recipeSummary[i].innerHTML = dataResults[i].summary;
  }
  const selectRecipeBtn = document.querySelectorAll(".add-recipe");

  selectRecipeBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("clicked");
      // reset selectedRecipe Array to clear out previous selection
      selectedRecipe = [];
      const getRecipeIndex = e.target.getAttribute("data-recipe");
      console.log(getRecipeIndex);
      selectedRecipe.push(dataResults[getRecipeIndex]);
      const stringifyCR = JSON.stringify(selectedRecipe);
      localStorage.setItem("Selected Recipe", stringifyCR);
      console.log("btn", stringifyCR);
      renderRecipeSelection(data);
      renderSelectRecipeInstructions(data);
      renderSelectionNutrients(data);
    });
  });
}

function goBackEvent(data) {
  goBackBtn.addEventListener("click", function () {
    clearRecipeCards();
    renderRecipePictureCard(data);
  });
}

function hideHeros() {
  const heroImage = document.querySelector("main");
  const heroText = document.querySelector(".hero-text");
  heroImage.classList.remove("hero-image")
  heroImage.setAttribute("class", "hero-results");
  heroText.classList.remove("hero-text", "text-block");
}

//////////////////////// Event Listener ////////////////////////
// Get recipe query results based on user input
recipeInputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  // below clears out any previously generated cards from previous searches
  clearRecipeCards();

  recipeQuery = e.target.lastElementChild.value;
  // fetch url below will include the recipe query input and return the nutrition info
  // we can comment out the snack type and mostly get entrees
  const spoonacularUrl =
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
    recipeQuery +
    // "&type=snack" +
    "&addRecipeNutrition=true" +
    "&apiKey=" +
    spoonacularKey;
  console.log(recipeQuery, "current");
  fetch(spoonacularUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data, "in fetch");
      dataResults = data.results;
      hideHeros();
      renderRecipePictureCard(data);
      // showCarousel();
      goBackEvent(data);
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
});
