const nameInput = document.getElementById("name")
const weightInput = document.getElementById("weight")
const nameWeightSubmit = document.getElementById("nameWeightSubmit")


nameWeightSubmit.addEventListener("click", function(event){
   event.stopPropagation()
    var nameValue = nameInput.value
    var weightValue = weightInput.value  
localStorage.setItem("name", nameValue)
localStorage.setItem("weight", weightValue)
})

