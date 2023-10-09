//////////////////////// Selectors ////////////////////////
const exerciseQueryInput = document.querySelector("#activity");
const workoutName = document.getElementById("workout-name");
const workoutSearchForm = document.getElementById("workout-search");
const workoutDuration = document.getElementById("workout-duration");
const caloriesBurnedDisplay = document.getElementById("calories-burned");
const workoutOutputContainer = document.getElementById(
  "workout-output-container"
);
///////Empty Variables for later use ////////////////////////
let caloriesBurned = "";
let workoutDurationValue = "";

// API Key Information
const nutritionixAPIKey = "c2b54dca13476d2a351b2efab070d586";
const nutritionixAPIID = "4f52c431";
//////////////////////// Rendering ////////////////////////
function durationToBurnCalories() {
  console.log(caloriesBurned); //in 30 min
  console.log(workoutDurationValue);
  const getRecipe = localStorage.getItem("Selected Recipe");
  const parseRecipe = JSON.parse(getRecipe);
  console.log(parseRecipe);
  recipeCalories = parseRecipe[0].nutrition.nutrients[0].amount;
  const durationMinutes = Math.ceil(
    (recipeCalories / caloriesBurned) * workoutDurationValue
  );
  console.log(durationMinutes);
  workoutDuration.textContent = `Duration: ${durationMinutes} Minutes`;
  const caloriesBurnedCalculation = (durationMinutes / 30) * caloriesBurned;
  console.log(caloriesBurnedCalculation);
  caloriesBurnedDisplay.textContent =
    "Calories Burned: " + caloriesBurnedCalculation + " calories";

  localStorage.setItem("Duration Minutes", durationMinutes);
  localStorage.setItem(
    "Calories Burned Calculation",
    caloriesBurnedCalculation
  );
  return durationMinutes;
}

// //////////////////////// Error Modals ////////////////////////

function recipeModalError() {}

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, {
    dismissible: true,
  });
});

function errorCheckModal() {
  const modalEmptySubmit = document.getElementById("modal1");
  var modalInstance = M.Modal.getInstance(modalEmptySubmit);
  modalInstance.open();
  return;
}
//////////////////////// Event Listener ////////////////////////
// Nutrionix Exercise API Fetches exercise from user input
workoutSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const exerciseQuery = exerciseQueryInput.value.trim();
  const exerciseAPI = "https://trackapi.nutritionix.com/v2/natural/exercise";

  if (exerciseQuery === "") {
    // Show the modal
    errorCheckModal();
  }

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
        errorCheckModal();
        throw new Error("!!!");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      workoutName.textContent = `${data.exercises[0].user_input}`;
      caloriesBurned = data.exercises[0].nf_calories;
      workoutDurationValue = data.exercises[0].duration_min;
      workoutImg = data.exercises[0].photo.thumb;
      durationToBurnCalories(caloriesBurned);
      //   renderWorkoutPhoto(data);
    })
    .catch((error) => {
      console.log("Response Error", error);
      errorCheckModal();
    });
});

////For future development////
// let workoutImg = "";
// function renderWorkoutPhoto(data) {
//   workoutOutputContainer.insertAdjacentHTML("beforeend", createCards);
//   document.getElementById("workout-img").setAttribute("src", workoutImg);
// }
