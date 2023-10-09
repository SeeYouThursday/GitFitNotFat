//////////////////////// Selectors ////////////////////////
const recipeInputForm = document.getElementById("recipeSearch");
const selectingInput = document.getElementById("selectingInput");
const recipeContainer = document.getElementById("recipe-container");
const goBackBtn = document.getElementById("goBack");
const confirmRecipeBtn = document.getElementById("confirm-recipe");
const resultsContainer = document.getElementById("results-container");
const nutrientsContainer = document.getElementById("nutrients-container");
const navigationBtns = document.getElementById("navigationBtns");
const recipeSummary = document.querySelector("#recipe-summary");
const removal = document.querySelector("#removal");

///////Empty Variables for later use ////////////////////////
let dataResults = "";
let recipeQuery = "";
let recipeImage = "";
let selectedRecipe = [];

const spoonacularKey = "5661b30edf15496e914efae71e0a25fc";
//////////////////////// Rendering ////////////////////////

const createCards =
  // below adjusting both s and m will size the whole card
  '<div class="col s12 m3 flex change-size">' +
  '<div class="card hoverable flex-column">' +
  '<div class="card-image">' +
  '<img class="insert-img responsive-img" src="" alt="">' +
  '<h6 class="card-title amber-text text-darken-4 amber lighten-5">Card Title</h6>' +
  '<button class="btn waves-effect waves-light red after-selection"><i class="material-icons add-recipe">add</i></button>' +
  "</div>" +
  '<div class="card-content">' +
  '<p class="caloriesPerServing"></p>' +
  "</div>" +
  '<div class="card-action">' +
  '<a href="#" target="_blank" class="more-info">This is a link</a>' +
  "</div>" +
  "</div>" +
  "</div>";

function clearRecipeCards() {
  if (recipeContainer.hasChildNodes) {
    recipeContainer.replaceChildren("");
    console.log("clearcards");
  } else return;
}

// Selection Rendering

function renderRecipeSelection(data) {
  clearRecipeCards();
  if (document.querySelector("#nutrients-container", ".hide")) {
    nutrientsContainer.classList.remove("hide");
    console.log("checking hide");
  } else {
    console.log("nowhere to hide");
  }
  nutrientsContainer.insertAdjacentHTML("afterbegin", createCards);
  const changeCardSize = document.querySelector(".change-size");
  const recipeImgEl = document.querySelector(".insert-img");
  const moreInfoRecipeEl = document.querySelector(".more-info");
  const cardTitleEl = document.querySelector(".card-title");
  const removeRecipeBtn = document.querySelector(".after-selection");
  removeRecipeBtn.remove();
  // removes the red btn from the image // might not need if rerendered into horizontal card
  // changeCardSize.setAttribute("id", "removal");
  changeCardSize.classList.remove("m3");
  changeCardSize.classList.add("m6", "removal");
  recipeImage = selectedRecipe[0].image;
  cardTitleEl.textContent = selectedRecipe[0].title;
  recipeImgEl.setAttribute("src", recipeImage);
  moreInfoRecipeEl.textContent = "Recipe Link";
  moreInfoRecipeEl.setAttribute("href", selectedRecipe[0].sourceUrl);
  recipeSummary.innerHTML = selectedRecipe[0].summary;
}
// Left off here 1009pm 10.5
function showNavigationBtns() {
  // once selection is made via the EvLi in RRPCard,
  // add confirm button and go back btn
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
// Multiple Results Below
function renderRecipePictureCards(data) {
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
      removeSelectionCard();
      // reset selectedRecipe Array to clear out previous selection
      selectedRecipe = [];
      const getRecipeIndex = e.target.getAttribute("data-recipe");
      selectedRecipe.push(dataResults[getRecipeIndex]);
      const stringifyCR = JSON.stringify(selectedRecipe);
      localStorage.setItem("Selected Recipe", stringifyCR);
      renderRecipeSelection(data);
      showNavigationBtns();
      renderSelectionNutrients(data);
    });
  });
}

function removeSelectionCard() {
  const removal = document.querySelectorAll(".removal");
  if (removal.length !== 0) {
    for (var i = 0; i < removal.length; i++) {
      removal[i].remove();
      console.log("Element with id 'removal' was removed");
      nutrientsContainer.classList.add("hide");
    }
    nutrientsContainer.classList.add("hide");
  } else {
    console.log("No element with id 'removal' found");
  }
}

// Changes out hero Images
function hideHeros() {
  const heroImage = document.querySelector("main");
  const heroText = document.querySelector("#recipeSearchBox");
  heroImage.classList.remove("hero-image");
  heroImage.setAttribute("class", "hero-results");
  heroText.classList.remove("hero-text", "text-block");
}

// function recipeModalError {

// }

//////////////////////// Event Listener ////////////////////////
// Get recipe query results based on user input
recipeInputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  // below clears out any previously generated cards from previous searches
  if (navigationBtns.classList.contains("hide")) {
  } else {
    navigationBtns.classList.add("hide");
  }

  clearRecipeCards();
  removeSelectionCard();
  recipeQuery = document.querySelector("input").value;

  // fetch url below will include the recipe query input and return the nutrition info
  // we can comment out the snack type and mostly get entrees
  const spoonacularUrl =
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
    recipeQuery +
    // "&type=snack" +
    "&addRecipeNutrition=true" +
    "&apiKey=" +
    spoonacularKey;
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
      renderRecipePictureCards(data);
      // showCarousel();
      console.log(data);
      goBackEvent(data);
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
});
function goBackEvent(data) {
  goBackBtn.addEventListener("click", function () {
    resultsContainer.classList.add("hide");
    removeSelectionCard();
    clearRecipeCards();
    console.log("remove Selection go back");
    navigationBtns.classList.add("hide");
    renderRecipePictureCards(data);
  });
}
