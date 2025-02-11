// Type color mapping based on Pokémon types to style the card dynamically
const typeColor = {
    bug: "#26de81",  // Green color for Bug type
    dragon: "#ffeaa7", // Yellow for Dragon type
    electric: "#fed330", // Yellow for Electric type
    fairy: "#FF0069", // Pink for Fairy type
    fighting: "#30336b", // Dark Blue for Fighting type
    fire: "#f0932b", // Orange for Fire type
    flying: "#81ecec", // Light Blue for Flying type
    grass: "#00b894", // Green for Grass type
    ground: "#EFB549", // Yellow-Green for Ground type
    ghost: "#a55eea", // Purple for Ghost type
    ice: "#74b9ff", // Ice Blue for Ice type
    normal: "#95afc0", // Grayish Blue for Normal type
    poison: "#6c5ce7", // Purple for Poison type
    psychic: "#a29bfe", // Light Purple for Psychic type
    rock: "#2d3436", // Dark Gray for Rock type
    water: "#0190FF", // Blue for Water type
  };
  
  // Base URL for fetching Pokémon data from the API
  const url = "https://pokeapi.co/api/v2/pokemon/";
  
  // Get references to the DOM elements where the card will be generated and the button
  const card = document.getElementById("card");
  const btn = document.getElementById("btn");
  
  // Async function to fetch Pokémon data and generate the card
  let getPokemoneData = async () => {
    // Generate a random number between 1 and 150 for selecting a Pokémon
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url + id; // Concatenate the base URL with the random ID
    
    try {
      // Fetch data from the API
      const response = await fetch(finalUrl);
      const data = await response.json();  // Convert the response to JSON
      console.log(data);  // Log the fetched data for debugging
      // Call generateCard function to display the Pokémon data
      generateCard(data);
    } catch (err) {
      console.error(err);  // If an error occurs, log it in the console
    }
  };
  
  // Function to generate the Pokémon card from the fetched data
  let generateCard = (data) => {
    // Extract necessary data from the API response
    const hp = data.stats[0].base_stat; // HP (Health Points)
    const imgSrc = data.sprites.other.dream_world.front_default; // Image of the Pokémon
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1); // Capitalize the Pokémon name
    const statAttack = data.stats[1].base_stat; // Attack stat
    const statDefance = data.stats[2].base_stat; // Defense stat
    const statSpeed = data.stats[5].base_stat; // Speed stat
    
    // Get the theme color based on the Pokémon's first type
    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor);  // Log the theme color for debugging
  
    // Dynamically generate the card's HTML content
    card.innerHTML = `
      <p class="hp">
        <span>HP</span>
        ${hp}
      </p>
      <img src="${imgSrc}" alt="Pokemone img">
      <h2 class="poke-name">${pokeName}</h2>
      <div class="types"></div>  <!-- The types will be appended here -->
      <div class="stats">
          <div>
              <h3>${statAttack}</h3>
              <p>Attack</p>
          </div>
  
          <div>
              <h3>${statDefance}</h3>
              <p>Defence</p>
          </div>
  
          <div>
              <h3>${statSpeed}</h3>
              <p>Speed</p>
          </div>
      </div>
    `;
  
    // Call appendTypes function to display Pokémon types
    appendTypes(data.types);
    // Style the card based on the Pokémon's type
    styleCard(themeColor);
  };
  
  // Function to append the types of the Pokémon to the card
  let appendTypes = (types) => {
    // Iterate over the types array and create span elements for each type
    types.forEach((item) => {
      let span = document.createElement("span");
      span.textContent = item.type.name;  // Set the type name as the text of the span
      document.querySelector(".types").appendChild(span);  // Append the span to the types div
    });
  };
  
  // Function to style the card based on the Pokémon's type color
  let styleCard = (color) => {
    // Apply a radial gradient background to the card using the theme color
    card.style.background = `radial-gradient(circle at top, ${color} 50%, rgb(187, 255, 0) 50%)`;
  
    // Style the background color of each type label to match the Pokémon's type
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
  };
  
  // Event listener for the "Generate" button to fetch and display a new Pokémon card
  btn.addEventListener("click", getPokemoneData);
  
  // Event listener to fetch a Pokémon card when the page loads
  window.addEventListener("load", getPokemoneData);
  