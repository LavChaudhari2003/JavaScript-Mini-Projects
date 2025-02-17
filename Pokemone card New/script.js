// Define colors for each Pokémon type using hex values
const typeColor = {
  bug: "#A8B820",
  dark: "#705848",
  dragon: "#7038F8",
  electric: "#F8D030",
  fairy: "#EE99AC",
  fighting: "#C03028",
  fire: "#F08030",
  flying: "#A890F0",
  ghost: "#705898",
  grass: "#78C850",
  ground: "#E0C068",
  ice: "#98D8D8",
  normal: "#A8A878",
  poison: "#A040A0",
  psychic: "#F85888",
  rock: "#B8A038",
  steel: "#B8B8D0",
  water: "#6890F0"
};

// Define the base URL for the Pokémon API
const url = " https://pokeapi.co/api/v2/pokemon/";

// Get references to the HTML elements for the Pokémon card and button
const card = document.getElementById("card");
const btn = document.getElementById("btn");

// Function to fetch random Pokémon data and generate the Pokémon card
let getPokeData = () => {
  // Generate a random Pokémon ID between 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;
  // Construct the full URL to fetch data for the Pokémon
  const finalUrl = url + id;
  // Fetch the Pokémon data from the API
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      // Once data is fetched, generate the card for the Pokémon
      generateCard(data);
    });
};

// Function to generate the Pokémon card with the fetched data
let generateCard = (data) => {
  // Extract necessary information from the Pokémon data
  console.log(data); // Log data to the console for debugging
  const hp = data.stats[0].base_stat; // HP stat
  const imgSrc = data.sprites.other.dream_world.front_default; // Pokémon image
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1); // Capitalized name
  const statAttack = data.stats[1].base_stat; // Attack stat
  const statDefense = data.stats[2].base_stat; // Defense stat
  const statSpAttack = data.stats[3].base_stat; // Special Attack stat
  const statSpDefense = data.stats[4].base_stat; // Special Defense stat
  const statSpeed = data.stats[5].base_stat; // Speed stat

  // Get the Pokémon's type and assign the corresponding theme color
  const themeColor = typeColor[data.types[0].type.name];

  // Populate the card with the Pokémon's data
  card.innerHTML = `
          <p class="hp">
            <span>HP</span>
              ${hp}
          </p>
          <img src=${imgSrc} />
          <h2 class="poke-name">${pokeName}</h2>
          <div class="types"> 
          </div>
          <div class="navBar">
              <span id="abBtn"> Abilities</span>
              <span id="stBtn">Stats</span>
          </div>
          <div class="show-details"> </div>
          <div class="stats">
          <div class="col1">
              <p>Attack</p>
              <p>Defense</p>
              <p>Speed</p>
              <p>Sp.Attack</p>
              <p>Sp.Defense</p>
          </div>
          
          <div class="col2">
              <div class="progressBar">
                <div class="progressFill" id="stat1"></div>
              </div>
              <div class="progressBar"><div class="progressFill" id="stat2"></div></div>
              <div class="progressBar"><div class="progressFill" id="stat3"></div></div>
              <div class="progressBar"><div class="progressFill" id="stat4"></div></div>
              <div class="progressBar"><div class="progressFill" id="stat5"></div></div>
          </div>
          
          <div class="col3">
              <h3>${statAttack}</h3>
              <h3>${statDefense}</h3>
              <h3>${statSpeed}</h3>
              <h3>${statSpAttack}</h3>
              <h3>${statSpDefense}</h3>
          </div>
</div>
            <div class="ability">
              <p>The Pokémon's Ability will be one of its non-hidden abilities. Hidden abilities were introduced in Generation V and are relatively rare and usually require some type of special encounter.</p>
              <div class ="abilityList"></div>
          </div>
    `;

  // Append the Pokémon's abilities, types, and apply styles to the card
  appendAbilities(data.abilities, themeColor);
  appendTypes(data.types);
  styleCard(themeColor);

  // Update the progress bars with the stats values
  updateProgressBar(statAttack, document.getElementById("stat1"), themeColor);
  updateProgressBar(statDefense, document.getElementById("stat2"), themeColor);
  updateProgressBar(statSpeed, document.getElementById("stat3"), themeColor);
  updateProgressBar(statSpAttack, document.getElementById("stat4"), themeColor);
  updateProgressBar(statSpDefense, document.getElementById("stat5"), themeColor);

  // Event listener for toggling between abilities and stats
  document.getElementById("abBtn").addEventListener("click", () => {
    // Show the abilities and hide the stats
    document.querySelector(".ability").classList.add("show");
    document.querySelector(".stats").classList.remove("show");

    // Update the active button's style
    document.querySelector("#abBtn").style.borderBottom = "1px solid #000000";
    document.querySelector("#stBtn").style.borderBottom = "none";
  });

  document.getElementById("stBtn").addEventListener("click", () => {
    // Show the stats and hide the abilities
    document.querySelector(".stats").classList.add("show");
    document.querySelector(".ability").classList.remove("show");

    // Update the active button's style
    document.querySelector("#stBtn").style.borderBottom = "1px solid #000000";
    document.querySelector("#abBtn").style.borderBottom = "none";
  });

  // Initially show the stats and highlight the "Stats" button
  document.querySelector(".stats").classList.add("show");
  document.querySelector("#stBtn").style.borderBottom = "solid 1px black";
};

// Function to update the progress bar based on stat value
function updateProgressBar(value, progressBar, themeColor) {
  if (progressBar) {
      // Calculate the width percentage based on the stat value (out of 255)
      let percentage = (value / 255) * 100;
      // Set the progress bar width and background color
      progressBar.style.width = percentage + "%";
      progressBar.style.background = themeColor;
  }
}

// Function to append the types of the Pokémon to the card
let appendTypes = (types) => {
  types.forEach((item) => {
    // Create a new span element for each type
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};

// Convert hex color code to RGBA with transparency
let hexToRGBA = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
};

// Function to append the abilities of the Pokémon to the card
let appendAbilities = (abilities, themeColor) => {
  abilities.forEach((ability) => {
    // Create a new div to hold each ability
    let abdiv = document.createElement("DIV");
    let abSpan1 = document.createElement("P");
    let abSpan2 = document.createElement("P");

    // Style the ability name with the theme color
    abSpan1.style.background = hexToRGBA(themeColor, 0.2);
    abSpan1.innerHTML = ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1);
    abSpan1.style.color = themeColor;

    // Append the ability name to the div
    abdiv.appendChild(abSpan1); 
    abdiv.appendChild(abSpan2); 

    // Fetch additional details about the ability
    let url = urlData(ability.ability.url);
    url.then((result) => {
        abSpan2.innerText = result;
    })

    // Append the ability div to the ability list
    document.querySelector(".abilityList").appendChild(abdiv);
  });
}

// Function to fetch ability data from the Pokémon API
let urlData = async(url) => {
    let data = await fetch(url);
    data = await data.json();
    return data.flavor_text_entries[1].flavor_text; // Return the flavor text for the ability
};

// Function to style the card with the Pokémon's theme color
let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;

  // Style the type elements with corresponding colors
  document.querySelectorAll(".types span").forEach((span) => {
    span.style.backgroundColor = typeColor[span.textContent];
  });
};

// Add event listeners to fetch new Pokémon data on button click or page load
btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
