//////////////////////// Selectors ////////////////////////
const nameInput = document.getElementById("name");
const weightInput = document.getElementById("weight");
const nameWeightSubmit = document.getElementById("nameWeightSubmit");
const getNameForm = document.getElementById("nameWeightSubmit");
const instructionDisplay = document.getElementById("instructions-container");

///////////////////////// Functions /////////////////////////

function storingNameWeight() {
  let nameValue = nameInput.value;
  let weightValue = weightInput.value;
  localStorage.setItem("name", nameValue);
  localStorage.setItem("weight", weightValue);
}

///////////////////////// Rendering /////////////////////////

// This function will render the user's name at the top

// This renders the recipe card to the page

//////////////////////// Event Listeners////////////////////////
getNameForm.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
  storingNameWeight();
  instructionPageDisplay();
  getGreeting();
});


