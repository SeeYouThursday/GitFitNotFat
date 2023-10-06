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
  const greetingEl = instructionDisplay.firstElementChild;
  console.log(greetingEl);
  const setGreetingText = (greetingEl.textContent =
    "Hello, " + localStorage.getItem("name") + "!");
}
// This renders the recipe card to the page

//////////////////////// Event Listeners////////////////////////
getNameForm.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
  storingNameWeight();
  getGreeting();
});
