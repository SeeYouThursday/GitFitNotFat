// Selectors
const nameInput = document.getElementById("name");
const weightInput = document.getElementById("weight");
const nameWeightSubmit = document.getElementById("nameWeightSubmit");
const getNameForm = document.getElementById("nameWeightSubmit");
const instructionDisplay = document.getElementById("instructions-container");
const recipeInputForm = document.getElementById("recipeSearch");
const recipeContainer = document.getElementById("recipe-container");

// Empty Variables to use globally
let currRecipe = "";
let currWorkout = "";
let recipeImage = "";
let dataResults = "";

// API Keys
const spoonacularKey = "5661b30edf15496e914efae71e0a25fc";

// Image Cards
const createCards =
  '<div class="row">' +
  // below adjusting both s and m will size the whole card
  '<div class="col s12 m3 l2 ">' +
  '<div class="card small hoverable">' +
  '<div class="card-image">' +
  '<img class="insert-img" src="">' +
  '<span class="card-title">Card Title</span>' +
  ' <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>' +
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

// Functions
function storingNameWeight() {
  let nameValue = nameInput.value;
  let weightValue = weightInput.value;
  localStorage.setItem("name", nameValue);
  localStorage.setItem("weight", weightValue);
}

// Rendering
// Change Needed to IPDisplay
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
    cardTitleEl[i].textContent = dataResults[i].title;
    recipeImgEl[i].setAttribute("src", recipeImage);
    moreInfoRecipeEl[i].textContent = "More Info";
    moreInfoRecipeEl[i].setAttribute("href", data.results[0].sourceUrl);
  }
}

// Event Listeners
// Render Name to Page
getNameForm.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
  storingNameWeight();
  instructionPageDisplay();
  getGreeting();
});

// For Calories - Need New API Here? Nutritionix?
document
  .getElementById("activity-submit")
  .addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
  });

// Get query results based on user input for recipes
recipeInputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();
  // below clears out any previously generated cards from previous searches
  recipeContainer.replaceChildren("");
  currRecipe = e.target.firstElementChild.value;
  // fetch url below will include the query input, only provide recipes with the meal type "snack", and return the nutrition info
  // we can comment out the snack type and mostly get entrees
  const spoonacularUrl =
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
    currRecipe +
    // "&type=snack" +
    "&addRecipeNutrition=true" +
    "&apiKey=" +
    spoonacularKey;
  console.log(currRecipe, "current");
  fetch(spoonacularUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      console.log(response);
      // response.json();
      return response.json();
    })
    .then(function (data) {
      console.log(data, "in fetch");
      dataResults = data.results;
      renderRecipePictureCard(data);
      // currRecipe = data.reusults;
    })
    .catch(function (error) {
      console.log(error);
    });
});

// store name and weight to localStorage
nameWeightSubmit.addEventListener("click", function (event) {
  event.stopPropagation();
  var nameValue = nameInput.value;
  var weightValue = weightInput.value;
  localStorage.setItem("name", nameValue);
  localStorage.setItem("weight", weightValue);
});
