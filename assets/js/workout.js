//////////////////////// Selectors ////////////////////////
const exerciseQueryInput = document.querySelector("#activity");
const workoutName = document.getElementById("workout-name");
const workoutSearchForm = document.getElementById("workout-search");
const workoutDuration = document.getElementById("workout-duration");
const caloriesBurnedDisplay = document.getElementById("calories-burned");
const workoutOutputContainer = document.getElementById(
  "workout-output-container"
);
const resultButton = document.getElementById("result-button");

///////Empty Variables for later use ////////////////////////
let caloriesBurned = "";
let workoutDurationValue = "";
let workoutNameInputValue = "";

// API Key Information
const nutritionixAPIKey = "c2b54dca13476d2a351b2efab070d586";
const nutritionixAPIID = "4f52c431";
//////////////////////// Rendering ////////////////////////

// Title Case function from:
//https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/

function titleCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

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
  workoutDuration.textContent = `Duration Minutes: ${durationMinutes}`;
  const caloriesBurnedCalculation = Math.round(
    (durationMinutes / 30) * caloriesBurned
  );
  console.log(caloriesBurnedCalculation);
  caloriesBurnedDisplay.textContent =
    "Calories Burned: " + caloriesBurnedCalculation;

  localStorage.setItem("Workout Name", titleCase(workoutNameInputValue));
  localStorage.setItem("Duration Minutes", durationMinutes);
  localStorage.setItem(
    "Calories Burned Calculation",
    caloriesBurnedCalculation
  );
  return durationMinutes;
}

// //////////////////////// Error Modals ////////////////////////

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
  console.log("SUBMIT");
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
      workoutNameInputValue = data.exercises[0].user_input;
      workoutName.textContent = workoutNameInputValue;
      caloriesBurned = data.exercises[0].nf_calories;
      workoutDurationValue = data.exercises[0].duration_min;
      workoutImg = data.exercises[0].photo.thumb;
      durationToBurnCalories(caloriesBurned);
      resultButton.classList.remove("hide");
      //   renderWorkoutPhoto(data);
    })
    .catch((error) => {
      console.log("Response Error", error);
      errorCheckModal();
    });
});

// function for the result button that takes you to final results page

resultButton.addEventListener("click", function () {
  window.location.href = "./finalresults.html";
});

//// Tooltip Function
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(elems);
});

////For future development////
// let workoutImg = "";
// function renderWorkoutPhoto(data) {
//   workoutOutputContainer.insertAdjacentHTML("beforeend", createCards);
//   document.getElementById("workout-img").setAttribute("src", workoutImg);
// }
