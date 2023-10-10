// retrieving stored recipe information from the recipeResults.html in local storage and populating it on the html
const selectedRecipeData = JSON.parse(localStorage.getItem("Selected Recipe"));

if (selectedRecipeData) {
  // getting elements by ID
  const recipeCardImage = document.getElementById("recipe-image");
  const recipeCardTitle = document.getElementById("recipe-title");
  const recipeCardLink = document.getElementById("recipe-link");
  const recipeCardSummary = document.getElementById("recipe-summary");

  // populating recipe card with information from local storage
  recipeCardImage.src = selectedRecipeData[0].image;
  recipeCardTitle.textContent = selectedRecipeData[0].title;
  recipeCardLink.href = selectedRecipeData[0].sourceUrl;
  recipeCardSummary.textContent = selectedRecipeData[0].summary;
} else {
  console.log("boop");
}
// retrieving stored workout information from the workout.html in local storage and populating it on the html
const selectedWorkoutData = localStorage.getItem("Duration Minutes");
// getting the duration-workout element by Id
if (selectedWorkoutData) {
  const durationMinutes = document.getElementById("duration-workout");

  // populating the duration-workout element with the stored information from local storage
  durationMinutes.textContent = `Duration Minutes: ${selectedWorkoutData} Minutes`;
}

const selectedCaloriesData = localStorage.getItem(
  "Calories Burned Calculation"
);
// getting the calories-burned-calculation element by Id
if (selectedCaloriesData) {
  const caloriesBurned = document.getElementById("calories-burned-calculation");

  // populating the calories burned calculation with the stored information from local storage
  caloriesBurned.textContent = `Calories Burned: ${selectedCaloriesData}`;
}

///////////////// Event Listeners///////////////
// function for the reset button to take the user back to the index.html
const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", function () {
  window.location.href = "./index.html";
});
