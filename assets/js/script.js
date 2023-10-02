const nameInput = document.getElementById("name");
const weightInput = document.getElementById("weight");
const nameWeightSubmit = document.getElementById("nameWeightSubmit");
const getNameForm = document.getElementById("nameWeightSubmit");
const instructionDisplay = document.getElementById("instructions-container");
const recipeInputForm = document.getElementById("recipeSearch");
let currRecipe = "";
let currWorkout = "";
let recipeImage = "";
// let recipeResults = []; //only use this if we go back to pulling multiple recipes
const spoonacularKey = "5661b30edf15496e914efae71e0a25fc";

//APIs Below:
// Use required headers to parse
// below uses autocomplete
// let spoonacularUrl = "https://api.spoonacular.com/recipes/autocomplete/?query=";
// let spoonacularUrl = "https://api.spoonacular.com/recipes/queries/analyze?q=";
let spoonacularUrl =
  "https://api.spoonacular.com/recipes/random?number=1&apiKey=" +
  spoonacularKey;
//   Workout API
const caloriesBurnedAPIUrl =
  "https://api.api-ninjas.com/v1/caloriesburnedactivities";
// use required header for authorization

// Functions
// Image Cards
const createCards =
  '<div class="row">' +
  // below adjusting both s and m will size the whole card
  '<div class="col s6 m3">' +
  '<div class="card">' +
  '<div class="card-image">' +
  '<img class="insert-img" src="">' +
  '<span class="card-title">Card Title</span>' +
  ' <a class="btn-floating halfway-fab waves-effect waves-light red "><i class="material-icons">+</i></a>' +
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

// Rendering
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
  const recipeContainer = document.getElementById("recipe-container");
  M.AutoInit();
  recipeContainer.innerHTML = createCards;

  recipeImage = data.recipes[0].image;
  const recipeImgEl = document.querySelector(".insert-img");
  const moreInfoRecipeEl = document.querySelector(".more-info");
  recipeImgEl.setAttribute("src", recipeImage);
  moreInfoRecipeEl.textContent = "More Info";
  moreInfoRecipeEl.setAttribute("href", data.recipes[0].sourceUrl);

  // for (var i = 0; i < recipeResults.length; i++) {
  //   recipeImage = recipeResults.results[i].image;
  // }
}
// Event Listeners
getNameForm.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
  storingNameWeight();
  instructionPageDisplay();
  getGreeting();
});

// recipeInputForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   e.stopPropagation();

//   currRecipe = e.target.firstElementChild.value;
//   console.log(currRecipe);
//   const newSpoonUrl = spoonacularUrl + currRecipe + "&apiKey=" + spoonacularKey;

// Tasty API
//   //   const url =
//   //     "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes";
//   //   const options = {
//   //     method: "GET",
//   //     headers: {
//   //       "X-RapidAPI-Key": "3346e774f3msh00ad9eacbba7f01p1b3735jsne8c689bb88f0",
//   //       "X-RapidAPI-Host": "tasty.p.rapidapi.com",
//   //     },
//   //   };
//   //   fetch(url, options)
//   //     .then(function (response) {
//   //       return response.json();
//   //     })
//   //     .then(function (data) {
//   //       console.log(data);
//   //     });
//   // }
//   // tastyTestApi();

//   // uses autocomplete url
//   function getRecipeQuery() {
//     fetch(newSpoonUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then(function (response) {
//         console.log(response);
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//         recipeResults = recipeResults.push(data);
//         renderRecipePictureCard(data);
//         return data;
//       });
//   }

// Unreliable :(
//   getRecipeQuery();
//   // function getRecipeSuggestions() {
//   //   fetch(newSpoonUrl, {
//   //     method: "GET",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //   })
//   //     .then(function (response) {
//   //       console.log(response);
//   //       return response.json();
//   //     })
//   //     .then(function (data) {
//   //       console.log(data);
//   //       recipeResults = recipeResults.push(data);
//   //       renderRecipePictureCard(data);
//   //       return data;
//   //     });
//   // }
//   // getRecipeSuggestions(newSpoonUrl);
// });

document
  .getElementById("randomRecipeGen")
  .addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

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
        renderRecipePictureCard(data);

        // below does not provide calories :(
        // fetch nutrition API is needed here!
        // fetchNutrition(recipes[0].id);
        return data;
      });
  });

function fetchNutrition(recipeID) {
  const nutritionGet =
    "https://api.spoonacular.com/recipes/" +
    recipeID +
    "/information&includeNutrition=true";

  fetch(nutritionGet, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      console.log(response.json());
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data;
    });
}
// function tastyTestApi() {

// Event Listeners
nameWeightSubmit.addEventListener("click", function (event) {
  event.stopPropagation();
  var nameValue = nameInput.value;
  var weightValue = weightInput.value;
  localStorage.setItem("name", nameValue);
  localStorage.setItem("weight", weightValue);
});
