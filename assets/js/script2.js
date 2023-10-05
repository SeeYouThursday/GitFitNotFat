const APIID = "4f52c431";
const APIKey = "c2b54dca13476d2a351b2efab070d586";
const exerciseAPI = "https://trackapi.nutritionix.com/v2/natural/exercise";
const exerciseQueryInput = document.querySelector(
  '#workout-container input[type="text"]'
);
const workoutSearchForm = document.getElementById("workout-search");
const workoutName = document.getElementById("workout-name");
const workoutDuration = document.getElementById("workout-duration");
const caloriesBurnedDisplay = document.getElementById("calories-burned");
let caloriesBurned = "";
let workoutDurationValue = "";

workoutSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = exerciseQueryInput.value.trim();

  fetch(exerciseAPI, {
    method: "POST",
    headers: {
      "x-app-id": APIID,
      "x-app-key": APIKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      workoutName.textContent = `${data.exercises[0].user_input}`;
      caloriesBurned = data.exercises[0].nf_calories;
      workoutDurationValue = data.exercises[0].duration_min;
      durationToBurnCalories(caloriesBurned);
      caloriesBurnedDisplay.textContent = `Calories Burned: ${data.exercises[0].nf_calories}`;
    });
});

function durationToBurnCalories() {
  console.log(caloriesBurned);
  console.log(workoutDuration.value);
  const durationMinutes =
    (recipeCalories / caloriesBurned) * workoutDurationValue;
  console.log(durationMinutes);
  workoutDuration.textContent = `Duration:${durationMinutes} Minutes`;
  return durationMinutes;
}
