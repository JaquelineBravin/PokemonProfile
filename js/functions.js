function convertTypeToLi(pokemonTypes) {
  return pokemonTypes.map(
    (typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
  );
}

function convertStatsToTd(pokemonStats) {
  return pokemonStats.map(
    (statSlot) => `
      <tr class="trBody"> <td >${statSlot.stat.name}</td> 
      <td >${statSlot.base_stat}</td>
      </tr>`
  );
}
