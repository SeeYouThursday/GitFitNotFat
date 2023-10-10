const selectedRecipeData = JSON.parse(localStorage.getItem("Selected Recipe"));

if (selectedRecipeData) {
  const recipeCardImage = document.getElementById("recipe-image");
  const recipeCardTitle = document.getElementById("recipe-title");
  const recipeCardLink = document.getElementById("recipe-link");
  const recipeCardSummary = document.getElementById("recipe-summary");

  recipeCardImage.src = selectedRecipeData[0].image;
  recipeCardTitle.textContent = selectedRecipeData[0].title;
  recipeCardLink.href = selectedRecipeData[0].sourceUrl;
  recipeCardSummary.textContent = selectedRecipeData[0].summary;
} else {
  console.log("boop");
}

const selectedWorkoutData = localStorage.getItem("Duration Minutes");

if (selectedWorkoutData) {
  const durationMinutes = document.getElementById("duration-workout");

  durationMinutes.textContent = `Duration Minutes: ${selectedWorkoutData} Minutes`;
}

const selectedCaloriesData = localStorage.getItem(
  "Calories Burned Calculation"
);

if (selectedCaloriesData) {
  const caloriesBurned = document.getElementById("calories-burned-calculation");

  caloriesBurned.textContent = `Calories Burned: ${selectedCaloriesData}`;
}

///////////////// Event Listeners///////////////
const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", function () {
  window.location.href = "./index.html";
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(elems);
});
