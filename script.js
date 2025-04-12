document.getElementById("search-button").addEventListener("click", async () => {
  const searchInput = document.getElementById("pokemon-search").value.toLowerCase();
  const detailsDiv = document.getElementById("pokemon-details");

  if (!searchInput) {
    detailsDiv.innerHTML = "<p>Please enter a Pokémon name or ID.</p>";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const data = await response.json();

    detailsDiv.innerHTML = `
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <h2>${data.name.toUpperCase()}</h2>
      <p><strong>Height:</strong> ${data.height}</p>
      <p><strong>Abilities:</strong></p>
      <ul>
        ${data.abilities.map(ability => `<li>${ability.ability.name}</li>`).join("")}
      </ul>
      <p><strong>Moves:</strong></p>
      <ul>
        ${data.moves.slice(0, 5).map(move => `<li>${move.move.name}</li>`).join("")}
      </ul>
    `;
  } catch (error) {
    detailsDiv.innerHTML = `<p>${error.message}</p>`;
  }
});
