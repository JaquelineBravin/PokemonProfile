const pokemonName = "pikachu";
const pokemonElements = document.getElementById("content");
const pokeApi = {};

function convertPokemonToHtml(pokemon) {
  return `<section id="content" class="content">
      <div class="container ${pokemon.types[0].type.name}">
        <div class="profile">
          <h1>${pokemon.name}</h1>
          <h6 class="order">${pokemon.id}</h6>
          <ol class="types">
            ${convertTypeToLi(pokemon.types).join("")}
          </ol>
        </div>
      <img
        src="${pokemon.sprites.front_default}"
        alt=""
      />
      <div class="stats">
        <table>
          <thead class="abilities">
            <th>Stats</th>
          </thead>
          <tbody">
            ${convertStatsToTd(pokemon.stats).join("")}
          </tbody>
        </table>
      </div>
    </div>
    </section>`;
}
/*
pokeApi.getPokemonDetail = (pokemon) => {
  console.log("Fetching detalhes para o Pokémon:", pokemon);

  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertApiToDetail)
    .catch((error) => {
      console.error("Erro ao obter detalhes do Pokémon:", error);
    });
};*/

pokeApi.getPokemons = (pokemonName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })

    .then((pokemon) => {
      // Aqui você já terá os detalhes do Pokémon específico
      return pokemon;
    })

    .catch((error) => {
      console.error(`Erro ao buscar o Pokémon: ${error}`);
    });
};

pokeApi.getPokemons(pokemonName).then((pokemon) => {
  const newHtml = convertPokemonToHtml(pokemon);
  pokemonElements.innerHTML = newHtml;
});
