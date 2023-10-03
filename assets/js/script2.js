const APIID = "4f52c431";
const APIKey = "c2b54dca13476d2a351b2efab070d586";
const exerciseAPI = "https://trackapi.nutritionix.com/v2/natural/exercise";
const exerciseQueryInput = document.querySelector(
  '#workout-container input[type="text"]'
);
const workoutName = document.getElementById("workout-name");
const workoutSearchForm = document.getElementById("workout-search");

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
      console.error("???", error);
    });
});