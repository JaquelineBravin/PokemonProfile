const pokemonName = "mewtwo";
const pokemonElements = document.getElementById("content");
const pokeApi = {};

function convertPokemonToHtml(pokemon) {
  return `<section id="content" class="content">
      <div id="container" class="container">
        <h1>${pokemon.name}</h1>
        <h6>${pokemon.order}</h6>
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
          <thead>
            <th class="abilities">Stats</th>
          </thead>
          <tbody>
            ${convertStatsToTd(pokemon.stats).join("")}
          </tbody>
        </table>
      </div>
    </section>`;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json());
};

/*
pokeApi.getPokemons = () => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //transformando a lista em promessas do detalhe do pokemon e fazendo conversão pra json
    .then((detailsRequests) => Promise.all(detailsRequests)) //esperara lista ser resolvida
    .then((pokemonsDetails) => pokemonsDetails)

    .catch((error) => console.log(error));
};
*/

pokeApi.getPokemons = (pokemonName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar o Pokémon: ${response.statusText}`);
      }
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

function convertTypeToLi(pokemonTypes) {
  return pokemonTypes.map(
    (typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
  );
}

function convertStatsToTd(pokemonStats) {
  return pokemonStats.map(
    (statSlot) => `
    <tr> <td class="abilities">${statSlot.stat.name}</td> 
    <td class="abilities">${statSlot.base_stat}</td>
    </tr>`
  );
}
