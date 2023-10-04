//////////////////////// Selectors ////////////////////////
const nameInput = document.getElementById("name");
const weightInput = document.getElementById("weight");
const nameWeightSubmit = document.getElementById("nameWeightSubmit");
const getNameForm = document.getElementById("nameWeightSubmit");
const instructionDisplay = document.getElementById("instructions-container");
const recipeInputForm = document.getElementById("recipeSearch");
const recipeContainer = document.getElementById("recipe-container");
const exerciseQueryInput = document.querySelector("#activity");
const workoutName = document.getElementById("workout-name");
const workoutSearchForm = document.getElementById("workout-search");

///////Empty Variables for later use ////////////////////////
let recipeQuery = "";
let currWorkout = "";
let recipeImage = "";
let dataResults = "";
let recipeIdTag = ""; //not used yet
let selectedRecipe = [];
/////////////////// API Keys/Info////////////////////////
const spoonacularKey = "5661b30edf15496e914efae71e0a25fc";
const nutritionixAPIKey = "c2b54dca13476d2a351b2efab070d586";
const nutritionixAPIID = "4f52c431";
//////////////////////// Image Cards ////////////////////////
const createCards =
  '<div class="row ">' +
  // below adjusting both s and m will size the whole card
  '<div class="col s12 m3 l2 ">' +
  '<div class="card hoverable">' +
  '<div class="card-image">' +
  '<img class="insert-img" src="">' +
  '<span class="card-title">Card Title</span>' +
  '<button class="btn-floating halfway-fab waves-effect waves-light red "><i class="material-icons add-recipe">add</i></button>' +
  "</div>" +
  '<div class="card-content">' +
  "<p>I am a very simple card. I am good at containing small bits of information.</p>" +
  "</div>" +
  '<div class="card-action">' +
  '<a href="#"  class="more-info">This is a link</a>' +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>";

function storingNameWeight() {
  let nameValue = nameInput.value;
  let weightValue = weightInput.value;
  localStorage.setItem("name", nameValue);
  localStorage.setItem("weight", weightValue);
}

///////////////////////// Rendering /////////////////////////
// Change Needed to InstucPageDisplay
function instructionPageDisplay() {
  instructionDisplay.classList.remove("invisible");
  instructionDisplay.classList.add("visible");
  // change above to however our CSS framework suggests
}

// This function will render the user's name at the top
function getGreeting() {
  const greetingEl = instructionDisplay.firstElementChild;
  console.log(greetingEl);
  const setGreetingText = (greetingEl.textContent =
    "Hello, " + localStorage.getItem("name") + "!");
}

// This renders the recipe card to the page
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
    cardTitleEl[i].textContent = dataResults[i].title;
    recipeImgEl[i].setAttribute("src", recipeImage);
    moreInfoRecipeEl[i].textContent = "More Info";
    moreInfoRecipeEl[i].setAttribute("href", data.results[0].sourceUrl);
    recipeBtns[i].setAttribute("data-recipe", i);
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
    });
  });
}

//////////////////////// Event Listeners////////////////////////
getNameForm.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
  storingNameWeight();
  instructionPageDisplay();
  getGreeting();
});

// Nutrionix Exercise API Fetches exercise from user input
workoutSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const exerciseQuery = exerciseQueryInput.value;
  const exerciseAPI = "https://trackapi.nutritionix.com/v2/natural/exercise";

  fetch(exerciseAPI, {
    method: "POST",
    headers: {
      "x-app-id": nutritionixAPIID,
      "x-app-key": nutritionixAPIKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: exerciseQuery,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("!!!");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      workoutName.textContent = data.name;
    })
    .catch((error) => {
      console.log("Response Error", error);
    });
});

// Get recipe query results based on user input
recipeInputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();
  // below clears out any previously generated cards from previous searches
  recipeContainer.replaceChildren("");
  recipeQuery = e.target.firstElementChild.value;
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
      renderRecipePictureCard(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
