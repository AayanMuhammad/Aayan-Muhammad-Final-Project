const userInput = document.querySelector(".user-input input");
const enterButton = document.querySelector(".enter");
const card = document.querySelector(".card");
const pokemonName = card.querySelector("h1");
const pokemonImage = card.querySelector("img");
const pokemonAbilities = card.querySelector(".abilities");


enterButton.addEventListener("click", (e) => {
  e.preventDefault();
  pokemonAbilities.textContent = "POWERS: "
  fetch("https://pokeapi.co/api/v2/pokemon/" + userInput.value.toLowerCase())
    .then((res) => {
      if(res.ok === true) {
        return res.json();
      }
    })
    .then((data) => {
      data.abilities.forEach((ability, i) => {
        pokemonAbilities.textContent += ability.ability.name.toUpperCase() + " ";
        });
      try {
        fetch(data.forms[0].url)
          .then((res) => res.json())
          .then((data) =>{ 
          console.log(data)
          pokemonName.textContent = data.name.toUpperCase();
          pokemonImage.src = data.sprites.front_shiny;
      });
        card.style.display = "flex";
      } catch {
        alert("Error getting that Pokemon, please try again");
      }
    });
});
