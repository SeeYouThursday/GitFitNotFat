//////////////////////// Selectors ////////////////////////
const nameInput = document.getElementById("name");
const weightInput = document.getElementById("weight");

const getNameForm = document.getElementById("nameWeightSubmit");
const instructionDisplay = document.getElementById("instructions-container");

///////////////////////// Functions /////////////////////////

function storingNameWeight() {
  let nameValue = nameInput.value;
  let weightValue = weightInput.value;
  localStorage.setItem("name", nameValue);
  localStorage.setItem("weight", weightValue);
}

// change above to however our CSS framework suggests
///////////////////////// Rendering /////////////////////////

// This function will render the user's name at the top
function getGreeting() {
  const greetingEl = document.getElementById("nameGreeting");
  console.log(greetingEl);
  greetingEl.textContent = "Hello, " + localStorage.getItem("name") + "!";
}
// This renders the recipe card to the page

//////////////////////// Event Listeners////////////////////////

const startGittingFitButton = document.getElementById("startGittingFitBtn");

startGittingFitButton.addEventListener("click", function () {
  window.location.href = "./recipeResults.html";
});
