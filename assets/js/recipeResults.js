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
// card HTML to be used to dynamically render Recipe Search Results
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

// Rendering Initial Recipe Results Page (multiple cards created)
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

    const recipeTitle = dataResults[i].title;
    cardTitleEl[i].textContent = recipeTitle;
    recipeImgEl[i].setAttribute("src", recipeImage);
    recipeImgEl[i].setAttribute("alt", recipeTitle);
    moreInfoRecipeEl[i].textContent = "Recipe Link";
    moreInfoRecipeEl[i].setAttribute("href", data.results[0].sourceUrl);
    recipeBtns[i].setAttribute("data-recipe", i);
    caloriePreview[i].textContent =
      "Calories per Serving: " + dataResults[i].nutrition.nutrients[0].amount;
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

// Selection Rendering - after user chooses from the picture cards above
function renderRecipeSelection(data) {
  clearRecipeCards();
  if (document.querySelector("#nutrients-container", ".hide")) {
    nutrientsContainer.classList.remove("hide");
    console.log("checking hide");
  } else {
    console.log("nowhere to hide");
  }

  const recipeImgEl = document.querySelector(".insert-img");
  const moreInfoRecipeEl = document.querySelector(".more-info");
  const cardTitleEl = document.querySelector(".card-title");

  recipeImage = selectedRecipe[0].image;
  cardTitleEl.textContent = selectedRecipe[0].title;
  recipeImgEl.setAttribute("src", recipeImage);
  moreInfoRecipeEl.textContent = "Recipe Link";
  moreInfoRecipeEl.setAttribute("href", selectedRecipe[0].sourceUrl);
  recipeSummary.innerHTML = selectedRecipe[0].summary;
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

function showNavigationBtns() {
  navigationBtns.classList.remove("hide");
  resultsContainer.classList.remove("hide");
}

//// Clearing/Removing/Hiding Elements and/or their contents
function clearRecipeCards() {
  if (recipeContainer.hasChildNodes) {
    recipeContainer.replaceChildren("");
    console.log("clearcards");
  } else return;
}

function removeSelectionCard() {
  const removal = document.querySelectorAll(".removal");
  if (removal.length !== 0) {
    for (var i = 0; i < removal.length; i++) {
      removal[i].remove();
      nutrientsContainer.classList.add("hide");
    }
    nutrientsContainer.classList.add("hide");
  } else {
    return;
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

// //////////////////////// Error Modals ////////////////////////

function recipeModalError() {
  const modalEmptySubmit = document.getElementById("modal1");
  var modalInstance = M.Modal.getInstance(modalEmptySubmit);
  modalInstance.open();
  return;
}
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, {
    dismissible: true,
  });
});

//////////////////////// Event Listener ////////////////////////
// Get recipe query results based on user input
recipeInputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  // below clears out any previously generated cards from previous searches
  clearRecipeCards();
  removeSelectionCard();

  if (navigationBtns.classList.contains("hide")) {
  } else {
    navigationBtns.classList.add("hide");
  }

  recipeQuery = document.querySelector("input").value;
  // Form Validation - making sure the query is valid
  if (recipeQuery === "") {
    // Show the modal
    const modalEmptySubmit = document.getElementById("modal1");
    var modalInstance = M.Modal.getInstance(modalEmptySubmit);
    modalInstance.open();
    return;
  }
  // fetch url below will include the recipe query input and return the nutrition info
  const spoonacularUrl =
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
    recipeQuery +
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
      return response.json();
    })
    .then(function (data) {
      dataResults = data.results;
      if (data.results.length === 0) {
        recipeModalError();
        return;
      }
      hideHeros();
      renderRecipePictureCards(data);
      goBackEvent(data);
      return data;
    })
    .catch(function (error) {
      console.log(error);
      recipeModalError();
    });
});

function goBackEvent(data) {
  goBackBtn.addEventListener("click", function () {
    resultsContainer.classList.add("hide");
    removeSelectionCard();
    clearRecipeCards();
    navigationBtns.classList.add("hide");
    renderRecipePictureCards(data);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(elems);
});
